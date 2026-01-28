import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function Events() {
  const upcomingEvents = [
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
                        <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-light">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-light">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-light">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Users className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-light">{event.attendees} attendees</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button className={cn(
                      "px-6 py-3 rounded-sm font-semibold whitespace-nowrap",
                      "bg-accent text-foreground hover:bg-amber-600",
                      "transition-colors duration-200"
                    )}>
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
                "focus:outline-none focus:ring-2 focus:ring-accent"
              )}
            />
            <button
              type="submit"
              className={cn(
                "px-6 py-3 rounded-sm font-semibold",
                "bg-accent text-foreground hover:bg-amber-600",
                "transition-colors duration-200"
              )}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

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
