/**
 * Index - Spa & Salon African Business Hub
 *
 * A modern hub for salon, spa & barbershop owners in Africa featuring:
 * - Hero section showcasing entrepreneurial stories and shop interiors
 * - Business-focused promotions banner
 * - Grid of articles on business tips, marketing, growth & community
 * - Newsletter for owners and managers
 * - Footer with useful business categories and links
 */

import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AdsBanner from "@/components/AdsBanner";
import FeaturedArticlesSection, { Article } from "@/components/FeaturedArticlesSection";
import { cn } from "@/lib/utils";
import { Mail, Instagram, Twitter, Facebook, MapPin, Phone } from "lucide-react";

export default function Index() {
  const [email, setEmail] = useState("");

  // Hero section images - 5 business-focused images for grid layout
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1765607476260-db2f5e310ea6?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Salon team strategy session",
      title: "Building Profitable Salon Teams",
      description: "How African salon owners create winning cultures and retain top talent",
      author: "Amara Okafor",
    },
    {
      src: "https://images.unsplash.com/photo-1763048208932-cbe149724374?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Busy African barbershop",
      title: "Consistent Clients, Predictable Income",
      description: "Systems that keep your chairs full week after week",
      author: "Zainab Hassan",
    },
    {
      src: "https://images.unsplash.com/photo-1765607476252-19010772800e?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Modern African salon interior",
      title: "Designing a Salon Clients Love",
      description: "Practical layout and experience tips that increase spend per visit",
      author: "Kwame Asante",
    },
    {
      src: "https://images.unsplash.com/photo-1662988890828-44464d1e0d80?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Owner reviewing finances",
      title: "Know Your Numbers",
      description: "Simple financial habits every salon, spa & barbershop owner needs",
      author: "Dr. Naledi Mvubu",
    },
    {
      src: "https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Community of beauty entrepreneurs",
      title: "You’re Not Building Alone",
      description: "Connect with a continent-wide community of ambitious beauty entrepreneurs",
      author: "Fatima Diallo",
    },
  ];

  // Sample article data - Spa & Salon African Business content
  const articles: Article[] = [
    {
      id: "1",
      title: "Pricing Blueprint for African Salons & Spas",
      excerpt: "Step-by-step approach to setting profitable prices without scaring away loyal clients.",
      image: "https://images.unsplash.com/photo-1658092967527-4e140d9bdaea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Business Tips",
      author: "Amara Okafor",
      date: "March 15, 2025",
      featured: true,
    },
    {
      id: "2",
      title: "Instagram & TikTok for Salon Owners",
      excerpt: "A simple content plan to attract dream clients and fill your schedule using social media.",
      image: "https://images.unsplash.com/photo-1553276738-5a611037a82c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Marketing",
      author: "Zainab Hassan",
      date: "March 12, 2025",
    },
    {
      id: "3",
      title: "From Stylist to CEO: Leading Your Team",
      excerpt: "How to step out from behind the chair and build a team that runs without you.",
      image: "https://images.unsplash.com/photo-1761233585177-73b12a61ea4d?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Leadership",
      author: "Kwame Asante",
      date: "March 10, 2025",
    },
    {
      id: "4",
      title: "Loyalty Programs that Actually Work",
      excerpt: "Designing memberships and packages that increase client retention and recurring revenue.",
      image: "https://images.unsplash.com/photo-1688302583595-5482083f6843?q=80&w=1543&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Growth",
      author: "Dr. Naledi Mvubu",
      date: "March 8, 2025",
    },
    {
      id: "5",
      title: "Barbershop Playbook: Stand Out on Your Street",
      excerpt: "Branding, signage and client experience tricks to dominate your local market.",
      image: "https://plus.unsplash.com/premium_photo-1729702169709-87c1e287a2a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Branding",
      author: "Fatima Diallo",
      date: "March 5, 2025",
    },
    {
      id: "6",
      title: "Smart Retail: Selling Products without Feeling ‘Salesy’",
      excerpt: "Turn your shelves into profit while still serving clients with integrity.",
      image: "https://images.unsplash.com/photo-1740501813766-067394db5b64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Revenue",
      author: "Prof. Kwesi Mensah",
      date: "March 1, 2025",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter signup:", email);
      alert("Thank you for subscribing to our beauty newsletter!");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Image Grid Layout */}
      <HeroSection
        images={heroImages}
      />

      {/* Ads Banner */}
      <AdsBanner
        title="Grow Your Salon, Spa & Barbershop Business"
        description="Join Spa & Salon African for practical business tools, marketing ideas and community support across the continent."
        ctaText="Get Growth Resources"
      />

      {/* Featured Articles Section */}
      <FeaturedArticlesSection
        title="Latest for Salon, Spa & Barbershop Owners"
        description="Actionable business tips, marketing strategies and growth stories from beauty entrepreneurs across Africa."
        articles={articles}
        onArticleClick={(article) => console.log("Article clicked:", article.title)}
      />

      {/* Contact Preview Section */}
      <section
        className={cn(
          "py-16 md:py-24 px-4 sm:px-6 lg:px-8",
          "bg-secondary/30"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Text & Details */}
            <div>
              <h2
                className={cn(
                  "font-display text-3xl md:text-4xl font-bold mb-4",
                  "text-foreground"
                )}
              >
                Get In Touch
              </h2>
              <p
                className={cn(
                  "text-foreground/70 text-base md:text-lg mb-8",
                  "font-light max-w-xl"
                )}
              >
            Ready to grow your beauty business or partner with Spa &amp;
                Salon African? Reach out and our team will respond as soon as
                possible.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3
                      className={cn(
                        "font-semibold mb-1",
                        "text-foreground"
                      )}
                    >
                      Visit Us
                    </h3>
                    <p className="text-foreground/60 font-light">
                      123 Beauty Lane, Salon District<br />
                      Africa, SA 12345
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3
                      className={cn(
                        "font-semibold mb-1",
                        "text-foreground"
                      )}
                    >
                      Call Us
                    </h3>
                    <p className="text-foreground/60 font-light">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-1" />
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
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Contact CTA */}
            <div className="bg-secondary border border-border rounded-lg p-6 md:p-8">
              <h3
                className={cn(
                  "font-display text-2xl font-semibold mb-3",
                  "text-foreground"
                )}
              >
                Send us a message
              </h3>
              <p className="text-foreground/60 text-sm md:text-base mb-6">
                Share your booking inquiry, collaboration idea, or question and
                we&apos;ll follow up via email.
              </p>

              <a
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-sm font-semibold",
                  "bg-black text-white hover:bg-black/90",
                  "transition-colors duration-200"
                )}
              >
                Go to Contact Page
              </a>

              <p className="mt-4 text-xs text-foreground/50">
                Prefer direct email? Write to{" "}
                <span className="font-medium text-foreground">
                  hello@spaandsalonafrica.com
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={cn(
        "py-16 md:py-24 px-4 sm:px-6 lg:px-8",
        "bg-secondary/50"
      )}>
        <div className="max-w-2xl mx-auto text-center">
            <h2 className={cn(
            "font-display text-4xl md:text-5xl font-bold mb-4",
            "text-foreground"
          )}>
            Stay Ahead in Business
          </h2>
          <p className={cn(
            "text-foreground/70 text-lg md:text-xl mb-8 font-light"
          )}>
            Get weekly insights on pricing, marketing, growth and community straight to your inbox as a salon, spa or barbershop owner.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "flex-1 px-4 py-3 rounded-sm",
                "bg-background border border-border",
                "text-foreground placeholder:text-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                "transition-all duration-200"
              )}
              required
            />
            <button
              type="submit"
              className={cn(
                "px-6 py-3 rounded-sm font-semibold",
                "bg-black text-white",
                "hover:bg-black/90 transition-colors duration-200",
                "active:scale-95 transform"
              )}
            >
              Subscribe
            </button>
          </form>

          <p className="text-sm text-foreground/50 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "border-t border-border bg-background",
        "py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      )}>
        <div className="max-w-7xl mx-auto">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Spa &amp; Salon African
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Your trusted hub for business tips, marketing ideas, growth strategies and community for African salon, spa &amp; barbershop owners.
              </p>
            </div>

            {/* Categories Column */}
            <div>
                <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-2 text-sm">
                {["Business Tips", "Marketing", "Growth", "Community"].map((cat) => (
                  <li key={cat}>
                    <a
                      href={`#${cat.toLowerCase()}`}
                      className="text-foreground/60 hover:text-foreground transition-colors duration-200"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Contact", "Partner With Us", "Sponsor Content"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-foreground/60 hover:text-foreground transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Facebook, label: "Facebook" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className={cn(
                      "p-2 rounded-md bg-secondary",
                      "text-foreground/60 hover:text-foreground hover:bg-black/10",
                      "transition-all duration-200"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={cn(
            "border-t border-border pt-8",
            "flex flex-col md:flex-row justify-between items-center gap-4"
          )}>
            <p className="text-sm text-foreground/50">
              &copy; 2025 Spa &amp; Salon African. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
