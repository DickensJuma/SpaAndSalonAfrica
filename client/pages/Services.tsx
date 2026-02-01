import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Scissors, Droplet, Wind } from "lucide-react";

export default function Services() {
  const services = [
    {
      category: "Business Coaching",
      icon: Scissors,
      description: "One-on-one and group coaching for salon, spa & barbershop owners",
      items: [
        { name: "Business Foundations Audit", price: "KES 6,000" },
        { name: "Pricing & Profit Strategy Session", price: "KES 12,000" },
        { name: "Team & Operations Coaching", price: "KES 9,000" },
        { name: "Monthly CEO Accountability", price: "KES 18,000" }
      ]
    },
    {
      category: "Marketing & Brand Growth",
      icon: Sparkles,
      description: "Marketing systems tailored for African beauty businesses",
      items: [
        { name: "Social Media Content Playbook", price: "KES 8,000" },
        { name: "Brand Positioning & Messaging", price: "KES 12,000" },
        { name: "Client Retention & Loyalty Design", price: "KES 9,500" },
        { name: "Launch Campaign Strategy", price: "KES 15,000" }
      ]
    },
    {
      category: "Operations & Systems",
      icon: Droplet,
      description: "Back-end systems that keep your business running smoothly",
      items: [
        { name: "Booking & Scheduling Systems", price: "KES 10,000" },
        { name: "Standard Operating Procedures Kit", price: "KES 14,000" },
        { name: "Retail & Inventory Setup", price: "KES 11,000" },
        { name: "Staff Onboarding Framework", price: "KES 18,000" }
      ]
    },
    {
      category: "Education & Training",
      icon: Wind,
      description: "Training for owners and teams to level up skills and service",
      items: [
        { name: "New Owner Bootcamp", price: "KES 15,000" },
        { name: "Front Desk & Client Experience Training", price: "KES 9,000" },
        { name: "Retail Sales Training", price: "KES 8,500" },
        { name: "Leadership for Salon Managers", price: "KES 16,000" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={cn(
              "font-display text-5xl md:text-6xl font-bold mb-6",
              "text-foreground"
            )}
          >
            How We Help Your Business Grow
          </h1>
          <p
            className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light max-w-2xl mx-auto"
            )}
          >
            Practical programs, coaching and systems for salon, spa & barbershop
            owners across Africa focused on business, marketing, growth and
            community.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.category}
                  className="rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Header */}
                  <div className="bg-black/5 p-6 flex items-center gap-4">
                    <Icon className="w-10 h-10 text-black flex-shrink-0" />
                    <div>
                      <h3 className={cn(
                        "font-display text-xl font-semibold",
                        "text-foreground"
                      )}>
                        {service.category}
                      </h3>
                      <p className="text-foreground/60 text-sm font-light">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Service Items */}
                  <div className="divide-y divide-border">
                    {service.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                      >
                        <h4 className="font-medium text-foreground">
                          {item.name}
                        </h4>
                        <span className="text-black font-semibold text-sm">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="p-4 bg-secondary/20">
                    <button className={cn(
                      "w-full px-4 py-2 rounded-sm font-semibold",
                      "bg-black text-white hover:bg-black/90",
                      "transition-colors duration-200 text-sm"
                    )}>
                      Talk to Our Team
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Packages */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Growth Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Launch Ready",
                price: "KES 50,000",
                services: [
                  "Brand & positioning workshop",
                  "Pricing & menu design",
                  "Launch marketing plan",
                  "30-day support check-in",
                ],
              },
              {
                name: "Scale & Systemise",
                price: "KES 35,000",
                services: [
                  "Operations & SOP review",
                  "Team roles & responsibilities map",
                  "Client journey optimisation",
                  "Basic financial dashboard setup",
                ],
              },
              {
                name: "Market Leader",
                price: "KES 60,000",
                services: [
                  "Advanced marketing strategy",
                  "Membership & loyalty design",
                  "Leadership coaching",
                  "Quarterly strategy reviews",
                ],
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-lg bg-white p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className={cn(
                  "font-display text-2xl font-bold mb-2",
                  "text-foreground"
                )}>
                  {pkg.name}
                </h3>
                <p className={cn(
                  "font-display text-3xl font-bold mb-6",
                  "text-black"
                )}>
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-foreground/70">
                      <div className="w-2 h-2 rounded-full bg-black" />
                      <span className="text-sm font-light">{service}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full px-4 py-2 rounded-sm font-semibold",
                    "bg-black text-white hover:bg-black/90",
                    "transition-colors duration-200"
                  )}
                >
                  Request More Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "border-t border-border bg-background",
        "py-12 px-4 sm:px-6 lg:px-8"
      )}>
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2026 Spa & Salon Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
