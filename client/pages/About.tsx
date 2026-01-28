import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Award, Users, Target, Heart } from "lucide-react";

export default function About() {
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
            About Spa &amp; Salon African
          </h1>
          <p
            className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light max-w-2xl mx-auto"
            )}
          >
            Empowering salon, spa &amp; barbershop business owners in Africa
            with the tools, knowledge and community they need to thrive.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2
                className={cn(
                  "font-display text-3xl md:text-4xl font-bold mb-6",
                  "text-foreground"
                )}
              >
                Our Story
              </h2>
              <p
                className={cn(
                  "text-foreground/70 text-base md:text-lg mb-4",
                  "font-light leading-relaxed"
                )}
              >
                Spa &amp; Salon African was created for the people who keep the
                continent looking and feeling good: salon, spa &amp; barbershop
                owners and their teams.
              </p>
              <p
                className={cn(
                  "text-foreground/70 text-base md:text-lg",
                  "font-light leading-relaxed"
                )}
              >
                We saw passionate entrepreneurs struggling with pricing,
                marketing, staff and growth — so we built a platform that
                focuses on business, not just beauty. Today we bring together
                African heritage, modern strategy and a powerful owner
                community.
              </p>
            </div>
            <div className="bg-secondary rounded-lg h-64 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1765607476260-db2f5e310ea6?q=80&w=1064&auto=format&fit=crop"
                alt="Salon interior"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description: "Committed to world-class standards in education, strategy and support."
              },
              {
                icon: Heart,
                title: "Authenticity",
                description: "Rooted in African realities, culture and markets — not imported theory."
              },
              {
                icon: Users,
                title: "Community",
                description: "Owners grow faster together through shared wins, challenges and ideas."
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Blending timeless business principles with modern tools and technology."
              }
            ].map((value) => (
              <div key={value.title} className="text-center">
                <value.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className={cn(
                  "font-display text-lg font-semibold mb-2",
                  "text-foreground"
                )}>
                  {value.title}
                </h3>
                <p className="text-foreground/60 text-sm font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Meet Our Team
          </h2>
          <p className={cn(
            "text-foreground/70 text-center mb-12 text-lg",
            "font-light max-w-2xl mx-auto"
          )}>
            Our team blends experience in salon ownership, marketing, education
            and technology to serve beauty entrepreneurs across the continent.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Amara Okafor", role: "Founder & Salon Growth Strategist" },
              { name: "Zainab Hassan", role: "Marketing & Community Lead" },
              { name: "Kwame Asante", role: "Education & Programs Director" }
            ].map((member) => (
              <div key={member.name} className="text-center p-6 rounded-lg bg-secondary/30">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 h-32 rounded-lg mb-4" />
                <h3 className={cn(
                  "font-display text-lg font-semibold mb-1",
                  "text-foreground"
                )}>
                  {member.name}
                </h3>
                <p className="text-foreground/60 text-sm font-light">
                  {member.role}
                </p>
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
