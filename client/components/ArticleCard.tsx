/**
 * Article Card Component
 * 
 * Individual article preview card featuring:
 * - Image with hover overlay effect
 * - Title
 * - Brief description/excerpt
 * - Optional category badge
 * - Optional author/date information
 * 
 * Features:
 * - Smooth hover animations
 * - Image overlay with gradient on hover
 * - Responsive sizing for different grid layouts
 * - Supports both featured and regular article styles
 */

import { cn } from "@/lib/utils";

interface ArticleCardProps {
  image: string;
  title: string;
  excerpt: string;
  category?: string;
  author?: string;
  date?: string;
  featured?: boolean;
  onClick?: () => void;
}

export default function ArticleCard({
  image,
  title,
  excerpt,
  category,
  author,
  date,
  featured = false,
  onClick,
}: ArticleCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "featured-article cursor-pointer h-full",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <div className={cn(
        "article-card flex flex-col h-full",
        featured ? "rounded-xl overflow-hidden shadow-lg" : "rounded-lg"
      )}>
        {/* Image Container */}
        <div className={cn(
          "relative overflow-hidden bg-gray-200",
          featured ? "h-96 md:h-full" : "h-48 md:h-64"
        )}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <div className="image-overlay" />

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4 z-10">
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
                "bg-accent text-foreground"
              )}>
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className={cn(
          "flex flex-col flex-grow p-4 md:p-6",
          featured ? "bg-white" : "bg-background border border-border"
        )}>
          {/* Title */}
          <h3 className={cn(
            "font-display font-bold mb-2 line-clamp-2",
            featured ? "text-3xl md:text-4xl" : "text-lg md:text-xl",
            "text-foreground transition-colors duration-200 group-hover:text-accent"
          )}>
            {title}
          </h3>

          {/* Excerpt */}
          <p className={cn(
            "text-foreground/70 text-sm md:text-base line-clamp-2",
            featured ? "mb-4 text-base md:text-lg" : "mb-3",
            "font-light leading-relaxed"
          )}>
            {excerpt}
          </p>

          {/* Meta Information */}
          {(author || date) && (
            <div className={cn(
              "mt-auto pt-4 border-t border-border/50 flex items-center justify-between",
              "text-xs md:text-sm text-foreground/50"
            )}>
              {author && <span className="font-medium">{author}</span>}
              {date && <span>{date}</span>}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
