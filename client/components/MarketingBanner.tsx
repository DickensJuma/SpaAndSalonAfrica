/**
 * Marketing Banner Component
 * 
 * Promotional banner section for promoting other businesses
 * Features:
 * - Responsive design
 * - Clean, professional styling
 * - Supports image, text, and CTA
 * - Customizable appearance
 */

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export interface MarketingBannerProps {
  businessName: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function MarketingBanner({
  businessName,
  description,
  imageUrl,
  ctaText = "Learn More",
  ctaUrl,
  backgroundColor = "bg-black/5",
  textColor = "text-foreground",
}: MarketingBannerProps) {
  return (
    <section className={cn(
      "w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8",
      "border-t border-b border-black/10",
      backgroundColor
    )}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Business Image (optional) */}
          {imageUrl && (
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  src={imageUrl}
                  alt={businessName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2">
              <span className={cn(
                "text-xs uppercase tracking-widest font-semibold",
                "text-foreground/50"
              )}>
                Partner Business
              </span>
            </div>
            <h3 className={cn(
              "font-display text-2xl md:text-3xl font-bold mb-3",
              textColor
            )}>
              {businessName}
            </h3>
            <p className={cn(
              "text-foreground/70 text-base md:text-lg mb-6",
              "font-light leading-relaxed max-w-2xl",
              "mx-auto md:mx-0"
            )}>
              {description}
            </p>
            {ctaUrl && ctaUrl !== "#" && (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold",
                  "bg-black text-white hover:bg-black/90",
                  "transition-all duration-300 hover:scale-105 hover:shadow-lg",
                  "active:scale-95"
                )}
                aria-label={`Visit ${businessName} website`}
              >
                {ctaText}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
