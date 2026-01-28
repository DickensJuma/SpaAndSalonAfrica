/**
 * 404 Not Found Page
 * 
 * Elegant 404 error page that maintains the site's design system
 * while clearly indicating the page doesn't exist.
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl">
          {/* Large 404 Number */}
          <div className={cn(
            "font-display text-9xl md:text-[150px] font-bold",
            "text-foreground/10 mb-4 leading-none"
          )}>
            404
          </div>

          {/* Headline */}
          <h1 className={cn(
            "font-display text-4xl md:text-5xl font-bold mb-4",
            "text-foreground"
          )}>
            Page Not Found
          </h1>

          {/* Description */}
          <p className={cn(
            "text-foreground/70 text-lg md:text-xl mb-8",
            "font-light leading-relaxed"
          )}>
            Sorry, we couldn't find the page you're looking for. 
            The article or section you're trying to access might have been moved or doesn't exist yet.
          </p>

          {/* Path Information */}
          <p className={cn(
            "text-sm text-foreground/50 mb-8 font-mono",
            "px-4 py-2 bg-secondary/50 rounded-md inline-block"
          )}>
            {location.pathname}
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className={cn(
                "px-8 py-3 rounded-sm font-semibold",
                "bg-accent text-foreground",
                "hover:bg-amber-600 transition-colors duration-200",
                "active:scale-95 transform"
              )}
            >
              Back to Home
            </Link>
            <a
              href="#"
              className={cn(
                "px-8 py-3 rounded-sm font-semibold",
                "bg-secondary text-foreground",
                "border border-border",
                "hover:bg-secondary/80 transition-colors duration-200",
                "active:scale-95 transform"
              )}
            >
              Browse Articles
            </a>
          </div>

          {/* Additional Help */}
          <p className={cn(
            "text-sm text-foreground/50 mt-12 pt-8 border-t border-border"
          )}>
            Need help? <a href="#" className="text-accent hover:text-amber-600 transition-colors">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
