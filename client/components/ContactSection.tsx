import { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
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
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
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
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
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
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
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
                <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
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
                    "focus:outline-none focus:ring-2 focus:ring-accent"
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
                    "focus:outline-none focus:ring-2 focus:ring-accent"
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
                    "focus:outline-none focus:ring-2 focus:ring-accent"
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
                    "focus:outline-none focus:ring-2 focus:ring-accent"
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
                    "focus:outline-none focus:ring-2 focus:ring-accent"
                  )}
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={cn(
                  "w-full px-6 py-3 rounded-sm font-semibold",
                  "bg-accent text-foreground hover:bg-amber-600",
                  "transition-colors duration-200"
                )}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

