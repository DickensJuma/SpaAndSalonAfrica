import * as brevo from "@getbrevo/brevo";

/**
 * Email service using Brevo (formerly Sendinblue)
 */
class EmailService {
  private apiInstance: brevo.TransactionalEmailsApi;
  private sender: brevo.SendSmtpEmailSender;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      throw new Error("BREVO_API_KEY environment variable is not set");
    }

    const apiClient = brevo.ApiClient.instance;
    const apiKeyAuth = apiClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;

    this.apiInstance = new brevo.TransactionalEmailsApi();
    
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
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = `New Contact Form Submission: ${data.subject}`;
      sendSmtpEmail.sender = this.sender;
      sendSmtpEmail.to = [{ email: adminEmail }];
      sendSmtpEmail.htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `;
      sendSmtpEmail.textContent = `
        New Contact Form Submission
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        Subject: ${data.subject}
        Message: ${data.message}
      `;

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
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
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = "Thank you for contacting Spa & Salon Africa";
      sendSmtpEmail.sender = this.sender;
      sendSmtpEmail.to = [{ email: data.email, name: data.name }];
      sendSmtpEmail.htmlContent = `
        <h2>Thank you for reaching out, ${data.name}!</h2>
        <p>We've received your message and will get back to you within 24-48 hours.</p>
        <p>Our team is committed to helping beauty business owners across Africa grow and succeed.</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `;
      sendSmtpEmail.textContent = `
        Thank you for reaching out, ${data.name}!
        
        We've received your message and will get back to you within 24-48 hours.
        
        Our team is committed to helping beauty business owners across Africa grow and succeed.
        
        Best regards,
        The Spa & Salon Africa Team
      `;

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
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
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = `Event Registration Confirmed: ${data.eventTitle}`;
      sendSmtpEmail.sender = this.sender;
      sendSmtpEmail.to = [{ email: data.email, name: data.name }];
      sendSmtpEmail.htmlContent = `
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
      `;
      sendSmtpEmail.textContent = `
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
      `;

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
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
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = `New Event Registration: ${data.eventTitle}`;
      sendSmtpEmail.sender = this.sender;
      sendSmtpEmail.to = [{ email: adminEmail }];
      sendSmtpEmail.htmlContent = `
        <h2>New Event Registration</h2>
        <p><strong>Event:</strong> ${data.eventTitle}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.businessName ? `<p><strong>Business:</strong> ${data.businessName}</p>` : ""}
        <p><strong>Registration ID:</strong> ${data.registrationId}</p>
      `;
      sendSmtpEmail.textContent = `
        New Event Registration
        Event: ${data.eventTitle}
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        ${data.businessName ? `Business: ${data.businessName}` : ""}
        Registration ID: ${data.registrationId}
      `;

      await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("✅ Event registration notification email sent");
    } catch (error) {
      console.error("❌ Error sending event registration notification email:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
