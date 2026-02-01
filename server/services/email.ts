import { TransactionalEmailsApi, SendSmtpEmail, SendSmtpEmailSender } from "@getbrevo/brevo";

/**
 * Email service using Brevo (formerly Sendinblue)
 */
class EmailService {
  private apiInstance: TransactionalEmailsApi | null;
  private sender: SendSmtpEmailSender;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY;
    
    if (!this.apiKey) {
      // Only throw in production or when actually trying to use the service
      // During dev/build, we'll allow it to be missing
      if (process.env.NODE_ENV === "production") {
        throw new Error("BREVO_API_KEY environment variable is not set");
      }
      // In development, we'll create a mock service that logs instead
      console.warn("⚠️  BREVO_API_KEY not set - email service will be disabled");
      this.apiInstance = null;
    } else {
      // Brevo v3: Create API instance - API key will be passed in requests
      this.apiInstance = new TransactionalEmailsApi();
    }
    
    this.sender = {
      name: process.env.BREVO_SENDER_NAME || "Spa & Salon Africa",
      email: process.env.BREVO_SENDER_EMAIL || "noreply@spaandsalonafrica.com",
    };
  }

  /**
   * Send contact form notification to admin
   */
  async sendContactNotification(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<void> {
    if (!this.apiInstance) {
      console.log("📧 [Email Service Disabled] Contact notification would be sent:", data);
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      const emailData: SendSmtpEmail = {
        subject: `New Contact Form Submission: ${data.subject}`,
        sender: this.sender,
        to: [{ email: adminEmail }],
        htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
        textContent: `
        New Contact Form Submission
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        Subject: ${data.subject}
        Message: ${data.message}
      `,
      };

      // Brevo v3: API key should be set via setApiKey or passed in options
      // Try to set it on the instance first
      try {
        if (typeof (this.apiInstance as any).setApiKey === 'function') {
          (this.apiInstance as any).setApiKey(0, this.apiKey);
        }
      } catch (e) {
        // Ignore if setApiKey doesn't exist
      }
      await this.apiInstance.sendTransacEmail(emailData);
      console.log("✅ Contact notification email sent");
    } catch (error) {
      console.error("❌ Error sending contact notification email:", error);
      throw error;
    }
  }

  /**
   * Send confirmation email to contact form submitter
   */
  async sendContactConfirmation(data: {
    name: string;
    email: string;
  }): Promise<void> {
    if (!this.apiInstance) {
      console.log("📧 [Email Service Disabled] Contact confirmation would be sent to:", data.email);
      return;
    }

    try {
      const emailData: SendSmtpEmail = {
        subject: "Thank you for contacting Spa & Salon Africa",
        sender: this.sender,
        to: [{ email: data.email, name: data.name }],
        htmlContent: `
        <h2>Thank you for reaching out, ${data.name}!</h2>
        <p>We've received your message and will get back to you within 24-48 hours.</p>
        <p>Our team is committed to helping beauty business owners across Africa grow and succeed.</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        textContent: `
        Thank you for reaching out, ${data.name}!
        
        We've received your message and will get back to you within 24-48 hours.
        
        Our team is committed to helping beauty business owners across Africa grow and succeed.
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      };

      // Brevo v3: API key should be set via setApiKey or passed in options
      // Try to set it on the instance first
      try {
        if (typeof (this.apiInstance as any).setApiKey === 'function') {
          (this.apiInstance as any).setApiKey(0, this.apiKey);
        }
      } catch (e) {
        // Ignore if setApiKey doesn't exist
      }
      await this.apiInstance.sendTransacEmail(emailData);
      console.log("✅ Contact confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending contact confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send event registration confirmation
   */
  async sendEventRegistrationConfirmation(data: {
    name: string;
    email: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    registrationId: string;
    paymentStatus?: string;
  }): Promise<void> {
    if (!this.apiInstance) {
      console.log("📧 [Email Service Disabled] Event registration confirmation would be sent to:", data.email);
      return;
    }

    try {
      const emailData: SendSmtpEmail = {
        subject: `Event Registration Confirmed: ${data.eventTitle}`,
        sender: this.sender,
        to: [{ email: data.email, name: data.name }],
        htmlContent: `
        <h2>Registration Confirmed!</h2>
        <p>Hi ${data.name},</p>
        <p>Your registration for <strong>${data.eventTitle}</strong> has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Event Details:</strong></p>
          <p>Date: ${data.eventDate}</p>
          <p>Time: ${data.eventTime}</p>
          <p>Location: ${data.eventLocation}</p>
          <p>Registration ID: ${data.registrationId}</p>
          ${data.paymentStatus === "paid" ? "<p style='color: green;'><strong>✓ Payment Confirmed</strong></p>" : ""}
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        textContent: `
        Registration Confirmed!
        
        Hi ${data.name},
        
        Your registration for ${data.eventTitle} has been confirmed.
        
        Event Details:
        Date: ${data.eventDate}
        Time: ${data.eventTime}
        Location: ${data.eventLocation}
        Registration ID: ${data.registrationId}
        ${data.paymentStatus === "paid" ? "✓ Payment Confirmed" : ""}
        
        We look forward to seeing you at the event!
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      };

      // Brevo v3: API key should be set via setApiKey or passed in options
      // Try to set it on the instance first
      try {
        if (typeof (this.apiInstance as any).setApiKey === 'function') {
          (this.apiInstance as any).setApiKey(0, this.apiKey);
        }
      } catch (e) {
        // Ignore if setApiKey doesn't exist
      }
      await this.apiInstance.sendTransacEmail(emailData);
      console.log("✅ Event registration confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending event registration confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send event registration notification to admin
   */
  async sendEventRegistrationNotification(data: {
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    eventTitle: string;
    registrationId: string;
  }): Promise<void> {
    if (!this.apiInstance) {
      console.log("📧 [Email Service Disabled] Event registration notification would be sent:", data);
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      const emailData: SendSmtpEmail = {
        subject: `New Event Registration: ${data.eventTitle}`,
        sender: this.sender,
        to: [{ email: adminEmail }],
        htmlContent: `
        <h2>New Event Registration</h2>
        <p><strong>Event:</strong> ${data.eventTitle}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.businessName ? `<p><strong>Business:</strong> ${data.businessName}</p>` : ""}
        <p><strong>Registration ID:</strong> ${data.registrationId}</p>
      `,
        textContent: `
        New Event Registration
        Event: ${data.eventTitle}
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        ${data.businessName ? `Business: ${data.businessName}` : ""}
        Registration ID: ${data.registrationId}
      `,
      };

      // Brevo v3: API key should be set via setApiKey or passed in options
      // Try to set it on the instance first
      try {
        if (typeof (this.apiInstance as any).setApiKey === 'function') {
          (this.apiInstance as any).setApiKey(0, this.apiKey);
        }
      } catch (e) {
        // Ignore if setApiKey doesn't exist
      }
      await this.apiInstance.sendTransacEmail(emailData);
      console.log("✅ Event registration notification email sent");
    } catch (error) {
      console.error("❌ Error sending event registration notification email:", error);
      throw error;
    }
  }
}

// Lazy-loaded singleton instance
let emailServiceInstance: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService();
  }
  return emailServiceInstance;
}

// Export for convenience (but it's lazy-loaded)
export const emailService = {
  sendContactNotification: (data: Parameters<EmailService["sendContactNotification"]>[0]) => 
    getEmailService().sendContactNotification(data),
  sendContactConfirmation: (data: Parameters<EmailService["sendContactConfirmation"]>[0]) => 
    getEmailService().sendContactConfirmation(data),
  sendEventRegistrationConfirmation: (data: Parameters<EmailService["sendEventRegistrationConfirmation"]>[0]) => 
    getEmailService().sendEventRegistrationConfirmation(data),
  sendEventRegistrationNotification: (data: Parameters<EmailService["sendEventRegistrationNotification"]>[0]) => 
    getEmailService().sendEventRegistrationNotification(data),
};
