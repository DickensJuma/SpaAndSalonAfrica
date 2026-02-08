/**
 * Ads Banner Component
 * 
 * Promotional banner section for advertisements and sponsored content
 * Maintains consistent styling with the rest of the site
 * 
 * Features:
 * - Responsive design
 * - Clean, minimal ad space
 * - Professional styling that matches the luxury salon aesthetic
 * - Customizable content and background
 */

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

interface AdsBannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundColor?: string;
}

export default function AdsBanner({
  title = "Grow Your Salon, Spa & Barbershop Business",
  description = "Get practical business tips, marketing ideas and growth strategies from Spa & Salon Africa.",
  ctaText = "Get Resources",
  onCtaClick,
  backgroundColor = "bg-secondary/80",
}: AdsBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section className={cn(
      "w-full py-6 md:py-8 px-4 sm:px-6 lg:px-8",
      "border-t border-b border-border",
      backgroundColor
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Ad Content */}
          <div className="flex-1">
            <h3 className={cn(
              "font-display text-xl md:text-2xl font-semibold mb-2",
              "text-foreground"
            )}>
              {title}
            </h3>
            <p className={cn(
              "text-foreground/70 text-sm md:text-base",
              "font-light line-clamp-2"
            )}>
              {description}
            </p>
          </div>

          {/* Ad Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCtaClick}
              className={cn(
                "px-6 py-2 rounded-sm font-semibold whitespace-nowrap",
                "bg-black text-white hover:bg-black/90",
                "transition-colors duration-200",
                "text-sm md:text-base"
              )}
            >
              {ctaText}
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className={cn(
                "p-2 rounded-md transition-colors duration-200",
                "text-foreground/60 hover:text-foreground hover:bg-black/10"
              )}
              aria-label="Close ad"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
