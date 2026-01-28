import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/ContactSection";

export default function Contact() {
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
            Get In Touch
          </h1>
          <p className={cn(
            "text-foreground/70 text-lg md:text-xl",
            "font-light max-w-2xl mx-auto"
          )}>
            We'd love to hear from you. Send us a message or visit us in person
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <ContactSection />

      {/* Map Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-secondary rounded-lg h-80 flex items-center justify-center">
            <p className="text-foreground/60">Map placeholder - Salon & Salon Africa location</p>
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
