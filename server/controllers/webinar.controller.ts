import { RequestHandler } from "express";
import { WebinarRegistrationRequest, WebinarRegistrationResponse, PaymentVerificationRequest, PaymentVerificationResponse } from "@shared/api";
import { WebinarRegistration } from "../db/models/WebinarRegistration";
import { emailService } from "../services/email";
import { paystackService } from "../services/paystack";

export class WebinarController {
    /**
     * Handle webinar registration
     * POST /api/webinar/register
     */
    static register: RequestHandler = async (req, res) => {
        try {
            const body = req.body as WebinarRegistrationRequest;

            // Validate required fields
            if (!body.name || !body.businessName || !body.phone || !body.email) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                } as WebinarRegistrationResponse);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(body.email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format",
                } as WebinarRegistrationResponse);
            }

            // Generate unique registration ID
            const registrationId = `WEB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // Webinar price (KES 2500 as per the frontend data)
            const webinarAmount = 2500;

            // Initialize Paystack payment
            let paymentUrl: string | undefined;
            let paymentReference: string | undefined;

            try {
                const payment = await paystackService.initializePayment({
                    email: body.email,
                    amount: paystackService.convertToKobo(webinarAmount),
                    currency: "KES",
                    reference: registrationId,
                    metadata: {
                        registrationId,
                        name: body.name,
                        businessName: body.businessName,
                        phone: body.phone,
                        questions: body.questions,
                        type: "webinar"
                    },
                    callbackUrl: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/events?payment=success`,
                });

                paymentUrl = payment.authorizationUrl;
                paymentReference = payment.reference;
            } catch (paymentError: any) {
                console.error("Error initializing payment:", paymentError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to initialize payment. Please try again later.",
                } as WebinarRegistrationResponse);
            }

            // Create webinar registration record
            const registration = new WebinarRegistration({
                name: body.name,
                businessName: body.businessName,
                phone: body.phone,
                email: body.email,
                questions: body.questions,
                registrationId,
                paymentReference,
                amount: webinarAmount,
                currency: "KES",
                paymentStatus: "pending",
            });

            // Save to database (if connected)
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

            // Send confirmation emails asynchronously
            Promise.all([
                // Send confirmation to user
                emailService.sendWebinarRegistrationConfirmation({
                    name: body.name,
                    email: body.email,
                    businessName: body.businessName,
                    registrationId,
                }),
                // Notify admin
                emailService.sendWebinarRegistrationNotification({
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    businessName: body.businessName,
                    questions: body.questions,
                    registrationId,
                }),
            ]).catch((error) => {
                console.error("Error sending webinar registration emails:", error);
                // Don't fail the request if emails fail
            });

            const response: WebinarRegistrationResponse = {
                success: true,
                message: "Registration initiated! Please complete your payment to secure your spot.",
                registrationId,
                paymentUrl,
                paymentReference,
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Error processing webinar registration:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred while processing your registration. Please try again later.",
            } as WebinarRegistrationResponse);
        }
    };

    /**
     * Verify webinar payment
     * POST /api/webinar/verify-payment
     */
    static verifyPayment: RequestHandler = async (req, res) => {
        try {
            const { reference } = req.body as PaymentVerificationRequest;

            if (!reference) {
                return res.status(400).json({
                    success: false,
                    message: "Payment reference is required",
                } as PaymentVerificationResponse);
            }

            // Verify payment with Paystack
            const payment = await paystackService.verifyPayment(reference);

            if (!payment.status) {
                return res.status(400).json({
                    success: false,
                    message: "Payment verification failed",
                    status: "failed",
                } as PaymentVerificationResponse);
            }

            // Update registration record
            const updatedRegistration = await WebinarRegistration.findOneAndUpdate(
                { paymentReference: reference },
                {
                    paymentStatus: "paid",
                },
                { new: true }
            );

            if (!updatedRegistration) {
                return res.status(404).json({
                    success: false,
                    message: "Registration not found",
                } as PaymentVerificationResponse);
            }

            // Send confirmation email for successful payment
            emailService.sendWebinarPaymentConfirmation({
                name: updatedRegistration.name,
                email: updatedRegistration.email,
                businessName: updatedRegistration.businessName,
                registrationId: updatedRegistration.registrationId,
                amount: payment.amount,
            }).catch((error) => {
                console.error("Error sending payment confirmation email:", error);
            });

            res.status(200).json({
                success: true,
                message: "Payment verified successfully! Your webinar registration is confirmed.",
                status: "success",
                amount: payment.amount,
            } as PaymentVerificationResponse);
        } catch (error) {
            console.error("Error verifying webinar payment:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred while verifying payment. Please contact support.",
                status: "failed",
            } as PaymentVerificationResponse);
        }
    };
}
