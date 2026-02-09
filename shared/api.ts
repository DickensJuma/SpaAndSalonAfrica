/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Contact Form Types
 */
export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

/**
 * Event Registration Types
 */
export interface EventRegistrationRequest {
  eventId: number;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  additionalInfo?: string;
  amount?: number; // Amount in KES if event is paid
  currency?: string;
}

export interface EventRegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  paymentUrl?: string; // Paystack payment URL if payment is required
  paymentReference?: string;
}

/**
 * Payment Verification Types
 */
export interface PaymentVerificationRequest {
  reference: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  status?: "success" | "failed" | "pending";
  amount?: number;
}

/**
 * Service Inquiry Types
 */
export interface ServiceInquiryRequest {
  serviceName: string;
  serviceCategory?: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  message?: string;
}

export interface ServiceInquiryResponse {
  success: boolean;
  message: string;
}

/**
 * Webinar Registration Types
 */
export interface WebinarRegistrationRequest {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  questions?: string;
}

export interface WebinarRegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  paymentUrl?: string; // Paystack payment URL if payment is required
  paymentReference?: string;
}

/**
 * Business Club Registration Types
 */
export interface BusinessClubRegistrationRequest {
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
}

export interface BusinessClubRegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
}
