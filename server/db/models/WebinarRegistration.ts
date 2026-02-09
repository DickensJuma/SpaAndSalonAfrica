import mongoose, { Schema, Document } from "mongoose";

export interface IWebinarRegistration extends Document {
    name: string;
    businessName: string;
    phone: string;
    email: string;
    questions?: string;
    registrationId: string;
    paymentReference?: string;
    amount?: number;
    currency?: string;
    paymentStatus?: "pending" | "paid" | "failed";
    createdAt: Date;
    updatedAt: Date;
}

const WebinarRegistrationSchema = new Schema<IWebinarRegistration>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        businessName: {
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
        questions: {
            type: String,
            trim: true,
        },
        registrationId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        paymentReference: {
            type: String,
            trim: true,
            index: true,
        },
        amount: {
            type: Number,
            min: 0,
        },
        currency: {
            type: String,
            default: "KES",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
WebinarRegistrationSchema.index({ email: 1 });
// registrationId already has unique: true which creates an index

export const WebinarRegistration = mongoose.models.WebinarRegistration || mongoose.model<IWebinarRegistration>(
    "WebinarRegistration",
    WebinarRegistrationSchema
);
