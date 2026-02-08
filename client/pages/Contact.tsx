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
          <div className="rounded-lg overflow-hidden border border-border">
            <div className="aspect-video w-full">
              <iframe
                title="Spa & Salon Africa - Westlands, Nairobi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.848799495342!2d36.80220781526116!3d-1.2685355359666414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173fd0e2ff2d%3A0x8f3cfc3d9fc1c2b5!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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
