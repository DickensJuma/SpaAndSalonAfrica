import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users, X, Loader2 } from "lucide-react";
import { EventRegistrationRequest, EventRegistrationResponse, PaymentVerificationRequest } from "@shared/api";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description: string;
}

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    additionalInfo: "",
  });

  // Handle payment verification on return from Paystack
  useEffect(() => {
    const reference = searchParams.get("reference");
    const paymentStatus = searchParams.get("payment");

    if (reference && paymentStatus === "success") {
      verifyPayment(reference);
      // Clean up URL
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const requestBody: PaymentVerificationRequest = { reference };

      const response = await fetch("/api/events/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Payment confirmed! Your registration is complete. You'll receive a confirmation email shortly.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Payment verification failed. Please contact support.",
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred while verifying payment. Please contact support.",
      });
    }
  };
  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setSubmitStatus({ type: null, message: "" });
    setRegistrationData({
      name: "",
      email: "",
      phone: "",
      businessName: "",
      additionalInfo: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleRegistrationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const requestBody: EventRegistrationRequest = {
        eventId: selectedEvent.id,
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone || undefined,
        businessName: registrationData.businessName || undefined,
        additionalInfo: registrationData.additionalInfo || undefined,
      };

      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: EventRegistrationResponse = await response.json();

      if (data.success) {
        // If payment URL is provided, redirect to payment
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }

        setSubmitStatus({
          type: "success",
          message: data.message,
        });
        // Reset form after successful submission
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to register. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting event registration:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "Salon Profitability Bootcamp",
      date: "April 15, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Spa & Salon Africa - Main Studio",
      attendees: 25,
      description: "Understand your numbers, set profitable prices and design packages that work in your market."
    },
    {
      id: 2,
      title: "Owner Networking Mixer",
      date: "April 22, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Spa & Salon Africa - Lounge",
      attendees: 40,
      description: "Connect with salon, spa & barbershop owners from your city and share real-world strategies."
    },
    {
      id: 3,
      title: "Marketing Made Simple for Salons",
      date: "May 5, 2025",
      time: "3:00 PM - 5:30 PM",
      location: "Spa & Salon Africa - Main Studio",
      attendees: 30,
      description: "A step-by-step plan to attract and retain ideal clients using social media and referrals."
    },
    {
      id: 4,
      title: "Systems & Staff Workshop",
      date: "May 12, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Spa & Salon Africa - Conference Room",
      attendees: 20,
      description: "Learn how to lead your team, create SOPs and free yourself from day-to-day chaos."
    },
    {
      id: 5,
      title: "Salon & Spa Expansion Clinic",
      date: "May 20, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Spa & Salon Africa - Wellness Center",
      attendees: 100,
      description: "For ambitious owners planning new branches or bigger locations across Africa."
    },
    {
      id: 6,
      title: "Business Club Owners Gala",
      date: "June 1, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "Spa & Salon Africa - Premium Lounge",
      attendees: 50,
      description: "Exclusive evening for Business Club members to celebrate wins and plan the next year of growth."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn(
            "font-display text-5xl md:text-6xl font-bold mb-6",
            "text-foreground"
          )}>
            Events for Salon, Spa & Barbershop Owners
          </h1>
          <p className={cn(
            "text-foreground/70 text-lg md:text-xl",
            "font-light max-w-2xl mx-auto"
          )}>
            Join workshops, clinics and networking experiences designed to help
            you grow your beauty business across Africa.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Event Info */}
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-display text-2xl font-semibold mb-4",
                      "text-foreground"
                    )}>
                      {event.title}
                    </h3>
                    <p className="text-foreground/70 mb-6 font-light">
                      {event.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Calendar className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Clock className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <MapPin className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Users className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">{event.attendees} attendees</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleRegisterClick(event)}
                      className={cn(
                        "px-6 py-3 rounded-sm font-semibold whitespace-nowrap",
                        "bg-black text-white hover:bg-black/90",
                        "transition-all duration-200 hover:scale-105 hover:shadow-lg",
                        "active:scale-95"
                      )}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={cn(
        "py-16 md:py-24 px-4 sm:px-6 lg:px-8",
        "bg-secondary/50"
      )}>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-4",
              "text-foreground"
            )}
          >
            Stay Updated
          </h2>
          <p className={cn(
            "text-foreground/70 text-lg mb-8 font-light"
          )}>
            Subscribe to receive event updates, registration links and exclusive
            invitations for owners and managers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-1 px-4 py-3 rounded-sm",
                "bg-background border border-border",
                "text-foreground placeholder:text-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-black"
              )}
            />
            <button
              type="submit"
              className={cn(
                "px-6 py-3 rounded-sm font-semibold",
                "bg-black text-white hover:bg-black/90",
                "transition-colors duration-200"
              )}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleCloseModal}
        >
          <div
            className={cn(
              "bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
              "border-2 border-black/10"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className={cn(
                  "font-display text-2xl font-bold",
                  "text-foreground"
                )}>
                  Register for {selectedEvent.title}
                </h3>
                <p className="text-sm text-foreground/60 mt-1">
                  {selectedEvent.date} • {selectedEvent.time}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-black/70 hover:text-black hover:bg-black/5 rounded-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-6">
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

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
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
                  value={registrationData.phone}
                  onChange={handleRegistrationChange}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={registrationData.businessName}
                  onChange={handleRegistrationChange}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="Your salon, spa or barbershop name"
                />
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={registrationData.additionalInfo}
                  onChange={handleRegistrationChange}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm resize-none",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black"
                  )}
                  placeholder="Any questions or special requirements?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={cn(
                    "flex-1 px-6 py-3 rounded-sm font-semibold",
                    "bg-secondary text-foreground border border-border",
                    "hover:bg-secondary/80 transition-colors duration-200"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "flex-1 px-6 py-3 rounded-sm font-semibold",
                    "bg-black text-white hover:bg-black/90",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={cn(
        "border-t border-border bg-background",
        "py-12 px-4 sm:px-6 lg:px-8"
      )}>
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2025 Spa & Salon Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
