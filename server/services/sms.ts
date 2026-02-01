import { TransactionalSMSApi } from "@getbrevo/brevo";

/**
 * SMS service using Brevo
 */
class SMSService {
  private apiInstance: TransactionalSMSApi | null;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY;
    
    if (!this.apiKey) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("BREVO_API_KEY environment variable is not set");
      }
      console.warn("⚠️  BREVO_API_KEY not set - SMS service will be disabled");
      this.apiInstance = null;
      return;
    }

    this.apiInstance = new TransactionalSMSApi();
  }

  /**
   * Send SMS notification
   */
  async sendSMS(data: {
    recipient: string;
    message: string;
  }): Promise<void> {
    if (!this.apiInstance) {
      console.log("📱 [SMS Service Disabled] SMS would be sent to:", data.recipient);
      return;
    }

    try {
      // Brevo SMS API requires phone number in international format
      const phoneNumber = this.formatPhoneNumber(data.recipient);
      
      if (!phoneNumber) {
        throw new Error("Invalid phone number format");
      }

      const smsData = {
        sender: process.env.BREVO_SMS_SENDER || "SpaSalon",
        recipient: phoneNumber,
        content: data.message,
      };

      // Brevo v3: Try to set API key before sending
      try {
        if (typeof (this.apiInstance as any).setApiKey === 'function') {
          (this.apiInstance as any).setApiKey(0, this.apiKey);
        }
      } catch (e) {
        // Ignore if setApiKey doesn't exist
      }
      await this.apiInstance.sendTransacSms(smsData);
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

// Lazy-loaded singleton instance
let smsServiceInstance: SMSService | null = null;

export function getSMSService(): SMSService {
  if (!smsServiceInstance) {
    smsServiceInstance = new SMSService();
  }
  return smsServiceInstance;
}

// Export for convenience (but it's lazy-loaded)
export const smsService = {
  sendSMS: (data: Parameters<SMSService["sendSMS"]>[0]) => 
    getSMSService().sendSMS(data),
  sendEventRegistrationSMS: (data: Parameters<SMSService["sendEventRegistrationSMS"]>[0]) => 
    getSMSService().sendEventRegistrationSMS(data),
};
