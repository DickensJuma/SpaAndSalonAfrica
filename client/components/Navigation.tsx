import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Navigation Component
 * 
 * Responsive navigation bar with:
 * - Logo/brand name
 * - Menu items for different sections (Beauty, Wellness, Trends, etc.)
 * - Search functionality with icon
 * - Mobile hamburger menu that expands on small screens
 * 
 * Features:
 * - Sticky positioning for always-accessible navigation
 * - Responsive design: full menu on desktop, hamburger on mobile
 * - Elegant styling matching the beauty publication aesthetic
 * - Smooth transitions and hover effects
 */

interface NavigationProps {
  onSearchClick?: () => void;
}

export default function Navigation({ onSearchClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="navbar">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        {/* Top row with search and mobile menu toggle */}
        <div className="flex items-center justify-between h-16 md:h-auto md:py-4">
          {/* Spacer for desktop, menu toggle for mobile */}
          <div className="md:hidden flex-1" />

          {/* Search Icon - visible on all sizes */}
          <button
            onClick={onSearchClick}
            className={cn(
              "md:absolute right-4 md:right-8 lg:right-12 p-2 rounded-md transition-colors duration-200",
              "text-foreground/70 hover:text-foreground hover:bg-secondary"
            )}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-md transition-colors duration-200",
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

        {/* Centered Logo/Brand */}
        <div className="flex justify-center py-4 md:py-6">
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

        {/* Desktop Menu - Centered below logo */}
        <div className="hidden md:flex items-center justify-center gap-8 md:gap-10 py-4 border-t border-border">
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
