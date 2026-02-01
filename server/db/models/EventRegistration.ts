import mongoose, { Schema, Document } from "mongoose";

export interface IEventRegistration extends Document {
  eventId: number;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  additionalInfo?: string;
  paymentStatus: "pending" | "paid" | "free" | "failed";
  paymentReference?: string;
  amount?: number;
  currency?: string;
  registrationId: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventId: {
      type: Number,
      required: true,
    },
    name: {
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
    phone: {
      type: String,
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "free", "failed"],
      default: "free",
    },
    paymentReference: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: "KES",
    },
    registrationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
EventRegistrationSchema.index({ eventId: 1, email: 1 });
EventRegistrationSchema.index({ registrationId: 1 });
EventRegistrationSchema.index({ paymentReference: 1 });

export const EventRegistration = mongoose.model<IEventRegistration>(
  "EventRegistration",
  EventRegistrationSchema
);
