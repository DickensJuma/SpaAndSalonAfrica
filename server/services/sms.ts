import * as brevo from "@getbrevo/brevo";

/**
 * SMS service using Brevo
 */
class SMSService {
  private apiInstance: brevo.TransactionalSMSApi;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      throw new Error("BREVO_API_KEY environment variable is not set");
    }

    const apiClient = brevo.ApiClient.instance;
    const apiKeyAuth = apiClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;

    this.apiInstance = new brevo.TransactionalSMSApi();
  }

  /**
   * Send SMS notification
   */
  async sendSMS(data: {
    recipient: string;
    message: string;
  }): Promise<void> {
    try {
      // Brevo SMS API requires phone number in international format
      const phoneNumber = this.formatPhoneNumber(data.recipient);
      
      if (!phoneNumber) {
        throw new Error("Invalid phone number format");
      }

      const sendTransacSms = new brevo.SendTransacSms();
      sendTransacSms.sender = process.env.BREVO_SMS_SENDER || "SpaSalon";
      sendTransacSms.recipient = phoneNumber;
      sendTransacSms.content = data.message;

      await this.apiInstance.sendTransacSms(sendTransacSms);
      console.log(`✅ SMS sent to ${phoneNumber}`);
    } catch (error) {
      console.error("❌ Error sending SMS:", error);
      throw error;
    }
  }

  /**
   * Send event registration SMS confirmation
   */
  async sendEventRegistrationSMS(data: {
    phone: string;
    name: string;
    eventTitle: string;
    eventDate: string;
    registrationId: string;
  }): Promise<void> {
    const message = `Hi ${data.name}, your registration for "${data.eventTitle}" on ${data.eventDate} is confirmed. Registration ID: ${data.registrationId}. See you there! - Spa & Salon Africa`;
    
    await this.sendSMS({
      recipient: data.phone,
      message,
    });
  }

  /**
   * Format phone number to international format
   * Assumes Kenyan numbers if no country code is provided
   */
  private formatPhoneNumber(phone: string): string | null {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    
    // If starts with country code, return as is
    if (digits.startsWith("254")) {
      return `+${digits}`;
    }
    
    // If starts with 0, replace with 254 (Kenya)
    if (digits.startsWith("0")) {
      return `+254${digits.substring(1)}`;
    }
    
    // If 9 digits, assume Kenyan number
    if (digits.length === 9) {
      return `+254${digits}`;
    }
    
    // If 10 digits and starts with 7, assume Kenyan number
    if (digits.length === 10 && digits.startsWith("7")) {
      return `+254${digits}`;
    }
    
    // Return null if format is unclear
    return null;
  }
}

// Export singleton instance
export const smsService = new SMSService();
