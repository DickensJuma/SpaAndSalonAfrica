import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Check, Gift, Users, TrendingUp } from "lucide-react";

export default function BusinessClub() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={cn(
            "font-display text-5xl md:text-6xl font-bold mb-6",
            "text-foreground"
          )}>
            Business Club for Owners
          </h1>
          <p className={cn(
            "text-foreground/70 text-lg md:text-xl",
            "font-light max-w-2xl mx-auto"
          )}>
            A community and resource hub built specifically for salon, spa &
            barbershop business owners across Africa.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Membership Benefits
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Gift,
                title: "Business Resources",
                description:
                  "Access templates, checklists and tools for pricing, marketing, hiring and growth.",
              },
              {
                icon: Users,
                title: "Owner Community",
                description:
                  "Connect with salon, spa & barbershop owners facing the same challenges you are.",
              },
              {
                icon: TrendingUp,
                title: "Growth Workshops",
                description:
                  "Monthly live sessions on marketing, leadership, finances and operations.",
              },
              {
                icon: Check,
                title: "Accountability",
                description:
                  "Regular check-ins and challenges to help you actually implement what you learn.",
              },
              {
                icon: Gift,
                title: "Partner Offers",
                description:
                  "Exclusive deals from product brands, software tools and service providers.",
              },
              {
                icon: Users,
                title: "Regional Meetups",
                description:
                  "In-person networking opportunities with owners in your city and region.",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg bg-secondary/30">
                <benefit.icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className={cn(
                    "font-display font-semibold mb-2",
                    "text-foreground"
                  )}>
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/60 text-sm font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Choose Your Tier
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "KES 9,900",
                period: "/year",
                features: [
                  "Access to private community",
                  "Monthly group Q&A calls",
                  "Resource library (templates & checklists)",
                ],
              },
              {
                name: "Growth",
                price: "KES 19,900",
                period: "/year",
                features: [
                  "Everything in Starter",
                  "Monthly live workshops",
                  "Quarterly 1:1 strategy call",
                  "Priority access to events",
                ],
                featured: true,
              },
              {
                name: "Leader",
                price: "KES 39,900",
                period: "/year",
                features: [
                  "Everything in Growth",
                  "Done-with-you implementation sprints",
                  "Exclusive mastermind group",
                  "Launch and campaign support",
                ],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "rounded-lg p-8 transition-transform hover:scale-105",
                  tier.featured
                    ? "bg-accent/20 border-2 border-accent"
                    : "bg-secondary/30"
                )}
              >
                <h3 className={cn(
                  "font-display text-2xl font-bold mb-2",
                  "text-foreground"
                )}>
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className={cn(
                    "font-display text-4xl font-bold",
                    "text-foreground"
                  )}>
                    {tier.price}
                  </span>
                  <span className="text-foreground/60 text-sm ml-2">
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground/70">
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-2 rounded-sm font-semibold transition-colors",
                  tier.featured
                    ? "bg-accent text-foreground hover:bg-amber-600"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}>
                  Join Now
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
          <p>&copy; 2025 Spa & Salon Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
