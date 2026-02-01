import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/ContactSection";
import MarketingBanner from "@/components/MarketingBanner";
import { Sparkles, Scissors, Droplet, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Copy */}
            <div className="text-center md:text-left space-y-8">
              <div className="mb-6 inline-block">
                <span
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest",
                    "bg-black/10 text-black border border-black/20",
                    "hover:bg-black/20 transition-colors duration-200"
                  )}
                >
                  Spa &amp; Salon African
                </span>
              </div>

              <h1
                className={cn(
                  "font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.15]",
                  "text-foreground tracking-tight"
                )}
              >
                Empowering Beauty Business
                <br />
                <span className="text-black">Owners in Africa</span>
              </h1>

              <p
                className={cn(
                  "text-foreground/70 text-lg md:text-xl lg:text-2xl max-w-3xl md:max-w-none mx-auto md:mx-0 mb-10",
                  "font-light leading-relaxed"
                )}
              >
                Business tips | Marketing | Growth | Community
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start mb-6">
                <Link
                  to="/business-club"
                  className={cn(
                    "px-10 py-5 rounded-sm font-semibold text-lg",
                    "bg-black text-white hover:bg-black/90",
                    "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                    "text-center active:scale-95"
                  )}
                >
                  Join the Business Club{" "}
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link
                  to="/services"
                  className={cn(
                    "px-10 py-5 rounded-sm font-semibold text-lg",
                    "bg-white text-black hover:bg-black/5",
                    "transition-all duration-300 border-2 border-black",
                    "text-center hover:shadow-lg active:scale-95"
                  )}
                >
                  Explore Growth Programs
                </Link>
              </div>

              <div className="text-base text-foreground/60 font-light">
                Supporting owners across Africa with practical tools and community.
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 md:h-[550px] lg:h-[650px] rounded-lg overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1643543156023-de1549751414?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="African salon and barbershop owners collaborating"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={cn(
              "font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6",
              "text-foreground tracking-tight"
            )}>
              Core Pillars of Growth
            </h2>
            <p className={cn(
              "text-foreground/60 text-xl md:text-2xl max-w-3xl mx-auto",
              "font-light leading-relaxed"
            )}>
              Everything we do is built around helping African salon, spa &amp;
              barbershop owners grow stronger businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={cn(
                    "p-8 rounded-lg border-2 transition-all duration-300",
                    "hover:shadow-2xl hover:border-black hover:-translate-y-2",
                    "bg-white border-black/10 cursor-pointer group"
                  )}
                >
                  <Icon className="w-12 h-12 text-black mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className={cn(
                    "font-display text-2xl font-bold mb-3",
                    "text-foreground"
                  )}>
                    {service.title}
                  </h3>
                  <p className={cn(
                    "text-foreground/60 text-base mb-6",
                    "font-light leading-relaxed"
                  )}>
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="text-foreground/60 flex items-center gap-3 text-sm font-light">
                        <span className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
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
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-lg overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1765607476260-db2f5e310ea6?q=80&w=1064&auto=format&fit=crop"
                  alt="Salon interior"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <h2
                className={cn(
                  "font-display text-5xl md:text-6xl font-bold mb-8",
                  "text-foreground tracking-tight"
                )}
              >
                Why Spa &amp; Salon African?
              </h2>

              <div className="space-y-8">
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
                      "You're not building alone — connect with other ambitious owners to share wins, challenges and support.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 group/item">
                    <Star className="w-7 h-7 text-black flex-shrink-0 mt-1 transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <h3
                        className={cn(
                          "font-bold text-xl mb-2",
                          "text-foreground"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-foreground/60 font-light text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className={cn(
                  "inline-block mt-10 px-8 py-4 rounded-sm font-semibold text-lg",
                  "bg-black text-white hover:bg-black/90",
                  "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                  "active:scale-95"
                )}
              >
                Explore How We Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={cn(
              "font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6",
              "text-foreground tracking-tight"
            )}>
              What Our Members Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
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
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className={cn(
                  "p-8 rounded-lg border-2 border-black/10",
                  "bg-white hover:border-black hover:shadow-2xl",
                  "transition-all duration-300 hover:-translate-y-2 group"
                )}
              >
                <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={`star-${i}`} className="w-5 h-5 fill-black text-black" aria-hidden="true" />
                  ))}
                </div>

                <p className={cn(
                  "text-foreground/70 mb-8 text-lg",
                  "font-light leading-relaxed"
                )}>
                  "{testimonial.text}"
                </p>

                <div className="border-t border-black/10 pt-6">
                  <p className="font-bold text-foreground text-lg mb-1">
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

      {/* Marketing Banner - Promote Other Businesses */}
      <MarketingBanner
        businessName="Featured Partner Business"
        description="Discover amazing products and services from our trusted partners. We carefully select businesses that align with our mission to support beauty entrepreneurs across Africa."
        imageUrl="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop"
        ctaText="Visit Partner"
        ctaUrl="#"
        backgroundColor="bg-white"
      />

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={cn(
            "font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8",
            "text-foreground tracking-tight"
          )}>
            Ready to Grow Your Beauty Business?
          </h2>

          <p className={cn(
            "text-foreground/70 text-xl md:text-2xl mb-12 max-w-3xl mx-auto",
            "font-light leading-relaxed"
          )}>
            Take the next step toward a stronger, more profitable salon, spa or
            barbershop with the support of Spa &amp; Salon African.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/business-club"
              className={cn(
                "px-10 py-5 rounded-sm font-semibold text-lg",
                "bg-black text-white hover:bg-black/90",
                "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                "active:scale-95"
              )}
            >
              Join the Business Club
            </Link>
            <Link
              to="/services"
              className={cn(
                "px-10 py-5 rounded-sm font-semibold text-lg",
                "bg-white text-black hover:bg-black/5",
                "transition-all duration-300 border-2 border-black",
                "hover:shadow-lg active:scale-95"
              )}
            >
              Explore Growth Programs
            </Link>
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
