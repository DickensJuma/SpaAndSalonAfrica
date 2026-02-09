import { RequestHandler } from "express";
import { ServiceInquiryRequest, ServiceInquiryResponse } from "@shared/api";
import { emailService } from "../services/email";

export class ServicesController {
    /**
     * Handle service inquiry submission
     * POST /api/services/inquiry
     */
    static submitInquiry: RequestHandler = async (req, res) => {
        try {
            const body = req.body as ServiceInquiryRequest;

            // Validate required fields
            if (!body.serviceName || !body.name || !body.email) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                } as ServiceInquiryResponse);
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(body.email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format",
                } as ServiceInquiryResponse);
            }

            // Send notification emails asynchronously
            Promise.all([
                // Notify admin
                emailService.sendServiceInquiryNotification({
                    serviceName: body.serviceName,
                    serviceCategory: body.serviceCategory,
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    businessName: body.businessName,
                    message: body.message,
                }),
                // Send confirmation to user
                emailService.sendServiceInquiryConfirmation({
                    name: body.name,
                    email: body.email,
                    serviceName: body.serviceName,
                }),
            ]).catch((error) => {
                console.error("Error sending service inquiry emails:", error);
                // Don't fail the request if emails fail
            });

            const response: ServiceInquiryResponse = {
                success: true,
                message: "Thank you for your interest! Our team will contact you within 24 hours.",
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Error processing service inquiry:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred while processing your request. Please try again later.",
            } as ServiceInquiryResponse);
        }
    };
}
