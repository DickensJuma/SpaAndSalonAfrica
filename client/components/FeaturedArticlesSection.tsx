/**
 * Featured Articles Section Component
 * 
 * Grid layout for displaying multiple article cards featuring:
 * - Responsive grid that adapts to screen size
 * - Optional section title and description
 * - Dynamic article data
 * - Featured article positioning (larger card)
 * 
 * Features:
 * - Desktop: 3-column grid with featured article spanning 2x2
 * - Tablet: 2-column grid
 * - Mobile: 1-column grid
 * - Smooth animations and transitions
 */

import ArticleCard from "./ArticleCard";
import { cn } from "@/lib/utils";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category?: string;
  author?: string;
  date?: string;
  featured?: boolean;
}

interface FeaturedArticlesSectionProps {
  title?: string;
  description?: string;
  articles: Article[];
  onArticleClick?: (article: Article) => void;
}

export default function FeaturedArticlesSection({
  title = "Featured Stories",
  description,
  articles,
  onArticleClick,
}: FeaturedArticlesSectionProps) {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className={cn(
            "font-display text-4xl md:text-5xl font-bold mb-4",
            "text-foreground"
          )}>
            {title}
          </h2>
          {description && (
            <p className={cn(
              "text-foreground/60 text-lg md:text-xl",
              "font-light max-w-2xl"
            )}>
              {description}
            </p>
          )}
        </div>

        {/* Articles Grid */}
        <div className={cn(
          "grid gap-6 md:gap-8",
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          "auto-rows-max md:auto-rows-[400px]"
        )}>
          {articles.map((article, index) => (
            <div
              key={article.id}
              className={cn(
                "transition-all duration-300",
                article.featured &&
                  "md:col-span-2 md:row-span-2 md:auto-rows-[540px]",
                index === 0 && !article.featured && "md:col-span-2"
              )}
            >
              <ArticleCard
                {...article}
                featured={article.featured || (index === 0)}
                onClick={() => onArticleClick?.(article)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
