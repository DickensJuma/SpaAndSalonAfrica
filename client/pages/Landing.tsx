import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/ContactSection";
import { Sparkles, Scissors, Droplet, Users, ArrowRight, Star } from "lucide-react";
import { useMemo } from "react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Hero Copy */}
            <div className="text-center md:text-left">
              <div className="mb-8 inline-block">
                <span
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider",
                    "bg-accent/20 text-accent border border-accent/30"
                  )}
                >
                  Spa &amp; Salon African
                </span>
              </div>

              <h1
                className={cn(
                  "font-display text-4xl md:text-6xl font-bold mb-6 leading-tight",
                  "text-foreground"
                )}
              >
                Empowering Salon, Spa &amp; Barbershop
                <br />
                business owners in Africa
              </h1>

              <p
                className={cn(
                  "text-foreground/70 text-xl md:text-2xl max-w-3xl md:max-w-none mx-auto md:mx-0 mb-8",
                  "font-light leading-relaxed"
                )}
              >
                Business tips | Marketing | Growth | Community
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <button className={cn(
                  "px-8 py-4 rounded-sm font-semibold text-lg",
                  "bg-accent text-foreground hover:bg-amber-600",
                  "transition-all duration-200 hover:scale-105"
                )}>
                  Join the Business Club <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
                <button className={cn(
                  "px-8 py-4 rounded-sm font-semibold text-lg",
                  "bg-secondary text-foreground hover:bg-secondary/80",
                  "transition-colors duration-200 border border-border"
                )}>
                  Explore Growth Programs
                </button>
              </div>

              <div className="text-sm text-foreground/60">
                Supporting owners across Africa with practical tools and community.
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1643543156023-de1549751414?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="African salon and barbershop owners collaborating"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-widest mb-1 text-white/70">
                  Real Owners. Real Businesses.
                </p>
                <p className="text-sm md:text-base font-medium">
                  Built for the everyday realities of salon, spa &amp; barbershop businesses in Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={cn(
              "font-display text-4xl md:text-5xl font-bold mb-4",
              "text-foreground"
            )}>
              Core Pillars of Growth
            </h2>
            <p className={cn(
              "text-foreground/60 text-lg max-w-2xl mx-auto",
              "font-light"
            )}>
              Everything we do is built around helping African salon, spa &amp;
              barbershop owners grow stronger businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Scissors,
                title: "Business",
                description:
                  "Foundations, pricing, operations and leadership for owners and managers.",
                items: [
                  "Business fundamentals",
                  "Pricing & profit",
                  "Systems & operations",
                ],
              },
              {
                icon: Sparkles,
                title: "Marketing",
                description:
                  "Practical marketing that works in African cities, towns and neighborhoods.",
                items: [
                  "Social media strategy",
                  "Client retention & loyalty",
                  "Brand & reputation",
                ],
              },
              {
                icon: Droplet,
                title: "Growth",
                description:
                  "Tools and support to help you move from survival to stability to expansion.",
                items: [
                  "New branch planning",
                  "Membership & packages",
                  "Revenue diversification",
                ],
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "A continent-wide network of beauty entrepreneurs who share, learn and win together.",
                items: [
                  "Owner community",
                  "Events & meetups",
                  "Peer support",
                ],
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-6 rounded-lg border transition-all duration-300",
                    "hover:shadow-lg hover:border-accent",
                    "bg-secondary/30 border-border"
                  )}
                >
                  <Icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className={cn(
                    "font-display text-xl font-semibold mb-2",
                    "text-foreground"
                  )}>
                    {service.title}
                  </h3>
                  <p className={cn(
                    "text-foreground/60 text-sm mb-4",
                    "font-light"
                  )}>
                    {service.description}
                  </p>
                  <ul className="text-xs space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="text-foreground/50 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1765607476260-db2f5e310ea6?q=80&w=1064&auto=format&fit=crop"
                alt="Salon interior"
                className="rounded-lg w-full h-96 object-cover"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2
                className={cn(
                  "font-display text-4xl font-bold mb-6",
                  "text-foreground"
                )}
              >
                Why Spa &amp; Salon African?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Built for African Owners",
                    description:
                      "Content, tools and programs created specifically for salons, spas & barbershops operating on the continent.",
                  },
                  {
                    title: "Business, Not Just Beauty",
                    description:
                      "We focus on pricing, marketing, systems and leadership so your passion can actually pay you.",
                  },
                  {
                    title: "Learn from Real Experience",
                    description:
                      "Insights and frameworks shaped by owners, coaches and experts who understand your day-to-day reality.",
                  },
                  {
                    title: "Community & Accountability",
                    description:
                      "You’re not building alone — connect with other ambitious owners to share wins, challenges and support.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <Star className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3
                        className={cn(
                          "font-semibold text-lg mb-1",
                          "text-foreground"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-foreground/60 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={cn(
                  "mt-8 px-6 py-3 rounded-sm font-semibold",
                  "bg-accent text-foreground hover:bg-amber-600",
                  "transition-colors duration-200"
                )}
              >
                Explore How We Help
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={cn(
              "font-display text-4xl md:text-5xl font-bold mb-4",
              "text-foreground"
            )}>
              What Our Members Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Zainab Hassan",
                role: "Salon Owner, Lagos",
                text: "For the first time in 8 years I understand my numbers and have a clear growth plan for my salon.",
                rating: 5
              },
              {
                name: "Kwame Asante",
                role: "Barbershop Founder, Accra",
                text: "The marketing playbooks helped us stay fully booked without discounting our prices every month.",
                rating: 5
              },
              {
                name: "Amara Okafor",
                role: "Spa Director, Nairobi",
                text: "Being part of this community means I never feel like I’m building alone. The workshops and support are priceless.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-6 rounded-lg border border-border",
                  "bg-secondary/30"
                )}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className={cn(
                  "text-foreground/70 mb-6",
                  "font-light"
                )}>
                  "{testimonial.text}"
                </p>

                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-foreground/60 font-light">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn(
            "font-display text-4xl font-bold mb-6",
            "text-foreground"
          )}>
            Ready to Grow Your Beauty Business?
          </h2>

          <p className={cn(
            "text-foreground/70 text-lg mb-8",
            "font-light"
          )}>
            Take the next step toward a stronger, more profitable salon, spa or
            barbershop with the support of Spa &amp; Salon African.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={cn(
              "px-8 py-4 rounded-sm font-semibold text-lg",
              "bg-accent text-foreground hover:bg-amber-600",
              "transition-all duration-200"
            )}>
              Join the Business Club
            </button>
            <button className={cn(
              "px-8 py-4 rounded-sm font-semibold text-lg",
              "bg-secondary text-foreground hover:bg-secondary/80",
              "transition-colors duration-200 border border-border"
            )}>
              Explore Growth Programs
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section (Home, with full form) */}
      <ContactSection />

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
