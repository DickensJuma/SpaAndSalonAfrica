import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Navigation Component
 * 
 * Responsive navigation bar with:
 * - Logo/brand name
 * - Menu items for different sections
 * - Mobile hamburger menu that expands on small screens
 * 
 * Features:
 * - Sticky positioning for always-accessible navigation
 * - Responsive design: full menu on desktop, hamburger on mobile
 * - Elegant styling matching the beauty publication aesthetic
 * - Smooth transitions and hover effects
 * - Logo hides on scroll up, only nav menu remains visible
 */

interface NavigationProps {
  // No props needed currently
}

export default function Navigation({}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show logo at top, hide when scrolled down
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Menu items for the salon and business website
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Business Club", href: "/business-club" },
    { label: "Events", href: "/events" },
    { label: "Services", href: "/services" },
    { label: "Magazine", href: "/magazine" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className={cn(
      "navbar sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300",
      isScrolled && "shadow-sm"
    )}>
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        {/* Top row with mobile menu toggle (mobile only) */}
        <div className="flex items-center justify-end h-16 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "p-2 rounded-md transition-colors duration-200",
              "text-foreground/70 hover:text-foreground hover:bg-secondary"
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Centered Logo/Brand - Hidden when scrolled */}
        <div className={cn(
          "flex justify-center py-4 md:py-6 transition-all duration-300 overflow-hidden",
          isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-40 opacity-100"
        )}>
          <Link to="/" className="flex flex-col items-center gap-2 md:gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb53adb8194b04987900de37b33347409%2F626c20dbe0ab423b917a9dd901b3f69c?format=webp&width=80&height=80"
              alt="Spa & Salon Africa"
              className="h-12 md:h-16 w-auto"
            />
            <div className="text-center">
              <div className="font-display text-xl md:text-2xl font-semibold text-foreground">
                SPA & SALON
              </div>
              <div className="text-xs md:text-sm text-foreground/60 tracking-widest uppercase">
                Africa
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Menu - Centered below logo, more compact when scrolled */}
        <div className={cn(
          "hidden md:flex items-center justify-center gap-8 md:gap-10 border-t border-border transition-all duration-300",
          isScrolled ? "py-2" : "py-4"
        )}>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200 uppercase tracking-wider",
                "text-foreground/70 hover:text-foreground",
                "border-b-2 border-transparent hover:border-accent pb-1"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-medium text-center rounded-md",
                  "text-foreground/70 hover:text-foreground hover:bg-secondary",
                  "transition-colors duration-200 uppercase tracking-wider"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
