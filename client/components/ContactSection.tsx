import { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { ContactFormRequest, ContactFormResponse } from "@shared/api";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const requestBody: ContactFormRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: ContactFormResponse = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2
              className={cn(
                "font-display text-3xl font-bold mb-8",
                "text-foreground"
              )}
            >
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className={cn(
                      "font-semibold mb-1",
                      "text-foreground"
                    )}
                  >
                    Address
                  </h3>
                  <p className="text-foreground/60 font-light">
                    123 Beauty Lane<br />
                    Salon District<br />
                    Africa, SA 12345
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className={cn(
                      "font-semibold mb-1",
                      "text-foreground"
                    )}
                  >
                    Phone
                  </h3>
                  <p className="text-foreground/60 font-light">
                    +1 (555) 123-4567
                    <br />
                    +1 (555) 123-4568
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className={cn(
                      "font-semibold mb-1",
                      "text-foreground"
                    )}
                  >
                    Email
                  </h3>
                  <p className="text-foreground/60 font-light">
                    hello@spaandsalonafrica.com
                    <br />
                    bookings@spaandsalonafrica.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className={cn(
                      "font-semibold mb-1",
                      "text-foreground"
                    )}
                  >
                    Business Hours
                  </h3>
                  <p className="text-foreground/60 font-light">
                    Monday - Friday: 9:00 AM - 7:00 PM
                    <br />
                    Saturday: 10:00 AM - 6:00 PM
                    <br />
                    Sunday: 11:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2
              className={cn(
                "font-display text-3xl font-bold mb-8",
                "text-foreground"
              )}
            >
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="services">Services Question</option>
                  <option value="business">Business Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm resize-none",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="Your message here..."
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={cn(
                    "p-4 rounded-sm text-sm",
                    submitStatus.type === "success"
                      ? "bg-black/10 text-black border border-black/20"
                      : "bg-red-50 text-red-700 border border-red-200"
                  )}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full px-6 py-3 rounded-sm font-semibold",
                  "bg-black text-white hover:bg-black/90",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

