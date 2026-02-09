import { RequestHandler } from "express";
import {
    EventRegistrationRequest,
    EventRegistrationResponse,
    PaymentVerificationRequest,
    PaymentVerificationResponse,
} from "@shared/api";
import { EventRegistration } from "../db/models/EventRegistration";
import { emailService } from "../services/email";
// import { smsService } from "../services/sms"; // Commented out - will be used later
import { paystackService } from "../services/paystack";

// Mock event data - in production, this would come from a database
const EVENT_DATA: Record<number, { title: string; date: string; time: string; location: string; amount?: number }> = {
    1: { title: "Salon Profitability Bootcamp", date: "April 15, 2026", time: "2:00 PM - 5:00 PM", location: "Spa & Salon Africa - Main Studio", amount: 5000 },
    2: { title: "Owner Networking Mixer", date: "April 22, 2026", time: "6:00 PM - 8:00 PM", location: "Spa & Salon Africa - Lounge" },
    3: { title: "Marketing Made Simple for Salons", date: "May 5, 2026", time: "3:00 PM - 5:30 PM", location: "Spa & Salon Africa - Main Studio", amount: 3000 },
    4: { title: "Systems & Staff Workshop", date: "May 12, 2026", time: "2:00 PM - 4:00 PM", location: "Spa & Salon Africa - Conference Room", amount: 4000 },
    5: { title: "Salon & Spa Expansion Clinic", date: "May 20, 2026", time: "10:00 AM - 6:00 PM", location: "Spa & Salon Africa - Wellness Center", amount: 10000 },
    6: { title: "Business Club Owners Gala", date: "June 1, 2026", time: "7:00 PM - 10:00 PM", location: "Spa & Salon Africa - Premium Lounge", amount: 15000 },
};

export class EventsController {
    /**
     * Handle event registration
     * POST /api/events/register
     */
    static register: RequestHandler = async (req, res) => {
        try {
            const body = req.body as EventRegistrationRequest;

            // Validate required fields
            if (!body.eventId || !body.name || !body.email) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                } as EventRegistrationResponse);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(body.email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format",
                } as EventRegistrationResponse);
            }

            // Get event data
            const eventData = EVENT_DATA[body.eventId];
            if (!eventData) {
                return res.status(404).json({
                    success: false,
                    message: "Event not found",
                } as EventRegistrationResponse);
            }

            // Generate unique registration ID
            const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // Determine if payment is required
            const eventAmount = body.amount || eventData.amount || 0;
            const isPaidEvent = eventAmount > 0;

            // Create registration record
            const registration = new EventRegistration({
                eventId: body.eventId,
                name: body.name,
                email: body.email,
                phone: body.phone,
                businessName: body.businessName,
                additionalInfo: body.additionalInfo,
                registrationId,
                paymentStatus: isPaidEvent ? "pending" : "free",
                amount: eventAmount,
                currency: body.currency || "KES",
            });

            let paymentUrl: string | undefined;
            let paymentReference: string | undefined;

            // Initialize payment if event is paid
            if (isPaidEvent) {
                try {
                    const payment = await paystackService.initializePayment({
                        email: body.email,
                        amount: paystackService.convertToKobo(eventAmount),
                        currency: body.currency || "KES",
                        reference: registrationId,
                        metadata: {
                            eventId: body.eventId,
                            eventTitle: eventData.title,
                            registrationId,
                            name: body.name,
                        },
                        callbackUrl: `${process.env.FRONTEND_URL || "http://localhost:8080"}/events?payment=success`,
                    });

                    paymentUrl = payment.authorizationUrl;
                    paymentReference = payment.reference;

                    registration.paymentReference = paymentReference;
                } catch (error) {
                    console.error("Error initializing payment:", error);
                    // Continue with registration even if payment fails - user can pay later
                }
            }

            // Save registration to database (if connected)
            try {
                await registration.save();
            } catch (dbError: any) {
                // If database is not connected, log but continue
                if (dbError.name === "MongoServerError" || dbError.message?.includes("Mongo")) {
                    console.warn("⚠️  Database not available, skipping save:", dbError.message);
                } else {
                    throw dbError;
                }
            }

            // Send notifications asynchronously
            if (!isPaidEvent || paymentUrl) {
                // Only send confirmation if it's a free event or payment was initialized
                Promise.all([
                    emailService.sendEventRegistrationConfirmation({
                        name: body.name,
                        email: body.email,
                        eventTitle: eventData.title,
                        eventDate: eventData.date,
                        eventTime: eventData.time,
                        eventLocation: eventData.location,
                        registrationId,
                        paymentStatus: isPaidEvent ? "pending" : undefined,
                    }),
                    emailService.sendEventRegistrationNotification({
                        name: body.name,
                        email: body.email,
                        phone: body.phone,
                        businessName: body.businessName,
                        eventTitle: eventData.title,
                        registrationId,
                    }),
                    // SMS sending commented out - will be used later
                    // body.phone
                    //   ? smsService.sendEventRegistrationSMS({
                    //       phone: body.phone,
                    //       name: body.name,
                    //       eventTitle: eventData.title,
                    //       eventDate: eventData.date,
                    //       registrationId,
                    //     }).catch((error) => {
                    //       console.error("Error sending SMS:", error);
                    //     })
                    //   : Promise.resolve(),
                ]).catch((error) => {
                    console.error("Error sending notifications:", error);
                    // Don't fail the request if notifications fail
                });
            }

            const response: EventRegistrationResponse = {
                success: true,
                message: isPaidEvent
                    ? paymentUrl
                        ? "Registration created! Please complete payment to confirm your spot."
                        : "Registration created! Payment initialization failed. Please contact support."
                    : "Registration successful! You'll receive a confirmation email shortly.",
                registrationId,
                paymentUrl,
                paymentReference,
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Error processing event registration:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred while processing your registration. Please try again later.",
            } as EventRegistrationResponse);
        }
    };

    /**
     * Handle payment verification
     * POST /api/events/verify-payment
     */
    static verifyPayment: RequestHandler = async (req, res) => {
        try {
            const body = req.body as PaymentVerificationRequest;

            if (!body.reference) {
                return res.status(400).json({
                    success: false,
                    message: "Payment reference is required",
                } as PaymentVerificationResponse);
            }

            // Verify payment with Paystack
            const verification = await paystackService.verifyPayment(body.reference);

            if (verification.status) {
                // Update registration payment status (if database is connected)
                let registration = null;
                try {
                    registration = await EventRegistration.findOne({
                        paymentReference: body.reference,
                    });

                    if (registration) {
                        registration.paymentStatus = "paid";
                        await registration.save();

                        // Get event data for confirmation email
                        const eventData = EVENT_DATA[registration.eventId];
                        if (eventData) {
                            // Send payment confirmation email
                            emailService
                                .sendEventRegistrationConfirmation({
                                    name: registration.name,
                                    email: registration.email,
                                    eventTitle: eventData.title,
                                    eventDate: eventData.date,
                                    eventTime: eventData.time,
                                    eventLocation: eventData.location,
                                    registrationId: registration.registrationId,
                                    paymentStatus: "paid",
                                })
                                .catch((error) => {
                                    console.error("Error sending payment confirmation email:", error);
                                });
                        }
                    }
                } catch (dbError: any) {
                    // If database is not connected, log but continue
                    if (dbError.name === "MongoServerError" || dbError.message?.includes("Mongo")) {
                        console.warn("⚠️  Database not available, skipping payment status update:", dbError.message);
                    } else {
                        throw dbError;
                    }
                }
            }

            const response: PaymentVerificationResponse = {
                success: verification.status,
                message: verification.status
                    ? "Payment verified successfully!"
                    : "Payment verification failed",
                status: verification.status ? "success" : "failed",
                amount: verification.amount,
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Error verifying payment:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred while verifying payment. Please try again later.",
            } as PaymentVerificationResponse);
        }
    };
}
