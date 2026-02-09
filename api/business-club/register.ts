import { BusinessClubRegistrationRequest, BusinessClubRegistrationResponse } from "@shared/api";
import { BusinessClubRegistration } from "../../server/db/models/BusinessClubRegistration";
import { emailService } from "../../server/services/email";

export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed'
        });
    }

    try {
        const body = req.body as BusinessClubRegistrationRequest;

        // Validate required fields
        const requiredFields = [
            'fullName', 'phone', 'email', 'businessName',
            'businessType', 'businessLocation', 'yearsInBusiness',
            'numberOfEmployees', 'businessRealities', 'expectations',
            'focusAreas', 'howDidYouHear'
        ];

        for (const field of requiredFields) {
            if (!body[field as keyof BusinessClubRegistrationRequest]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                } as BusinessClubRegistrationResponse);
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            } as BusinessClubRegistrationResponse);
        }

        // Generate unique registration ID
        const registrationId = `BC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create business club registration record
        const registration = new BusinessClubRegistration({
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            businessName: body.businessName,
            businessType: body.businessType,
            businessLocation: body.businessLocation,
            yearsInBusiness: body.yearsInBusiness,
            numberOfEmployees: body.numberOfEmployees,
            businessRealities: body.businessRealities,
            expectations: body.expectations,
            focusAreas: body.focusAreas,
            howDidYouHear: body.howDidYouHear,
            registrationId,
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
            emailService.sendBusinessClubRegistrationConfirmation({
                name: body.fullName,
                email: body.email,
                businessName: body.businessName,
                registrationId,
            }),
            // Notify admin
            emailService.sendBusinessClubRegistrationNotification({
                fullName: body.fullName,
                email: body.email,
                phone: body.phone,
                businessName: body.businessName,
                businessType: body.businessType,
                businessLocation: body.businessLocation,
                yearsInBusiness: body.yearsInBusiness,
                numberOfEmployees: body.numberOfEmployees,
                businessRealities: body.businessRealities,
                expectations: body.expectations,
                focusAreas: body.focusAreas,
                howDidYouHear: body.howDidYouHear,
                registrationId,
            }),
        ]).catch((error) => {
            console.error("Error sending business club registration emails:", error);
            // Don't fail the request if emails fail
        });

        const response: BusinessClubRegistrationResponse = {
            success: true,
            message: "Application submitted successfully! We'll review your application and get back to you within 24-48 hours.",
            registrationId,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error processing business club registration:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your application. Please try again later."
        } as BusinessClubRegistrationResponse);
    }
}
