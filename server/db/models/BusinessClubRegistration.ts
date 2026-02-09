import mongoose, { Schema, Document } from "mongoose";

export interface IBusinessClubRegistration extends Document {
    fullName: string;
    phone: string;
    email: string;
    businessName: string;
    businessType: string;
    businessLocation: string;
    yearsInBusiness: string;
    numberOfEmployees: string;
    businessRealities: string[];
    expectations: string;
    focusAreas: string[];
    howDidYouHear: string;
    registrationId: string;
    createdAt: Date;
    updatedAt: Date;
}

const BusinessClubRegistrationSchema = new Schema<IBusinessClubRegistration>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        businessName: {
            type: String,
            required: true,
            trim: true,
        },
        businessType: {
            type: String,
            required: true,
            trim: true,
            enum: ["Spa", "Hair and Beauty Salon", "Barbershop", "Salon & Spa", "Barbershop & Salon", "Nail Salon"],
        },
        businessLocation: {
            type: String,
            required: true,
            trim: true,
        },
        yearsInBusiness: {
            type: String,
            required: true,
            trim: true,
            enum: ["Less than 1 year", "1 – 3 years", "3 – 5 years", "Over 5 years"],
        },
        numberOfEmployees: {
            type: String,
            required: true,
            trim: true,
            enum: ["1 (Just me)", "2 – 3", "4 – 6", "7 – 10", "10+"],
        },
        businessRealities: {
            type: [String],
            required: true,
            enum: [
                "I'm busy but profits are zero to none",
                "I struggle with pricing",
                "Cash flow is inconsistent",
                "Staff management is a challenge",
                "I want to grow but don't know how",
                "I feel overwhelmed running the business",
                "Things are going well, but I want to scale",
            ],
        },
        expectations: {
            type: String,
            required: true,
            trim: true,
        },
        focusAreas: {
            type: [String],
            required: true,
            enum: [
                "Pricing & profitability",
                "Financial management & taxes",
                "Staff management & retention",
                "Marketing & customer retention",
                "Business systems & structure",
                "Scaling & opening more branches",
                "Personal growth as a business owner",
            ],
        },
        howDidYouHear: {
            type: String,
            required: true,
            trim: true,
            enum: ["Instagram", "WhatsApp", "Referral from another owner", "Webinar / Event", "Other"],
        },
        registrationId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
BusinessClubRegistrationSchema.index({ email: 1 });
BusinessClubRegistrationSchema.index({ businessType: 1 });
// registrationId already has unique: true which creates an index

export const BusinessClubRegistration = mongoose.models.BusinessClubRegistration || mongoose.model<IBusinessClubRegistration>(
    "BusinessClubRegistration",
    BusinessClubRegistrationSchema
);
