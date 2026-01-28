/**
 * Hero Section Component
 * 
 * Modern hero section featuring:
 * - 5-image grid layout with 3 columns
 * - Large center image (spans full height)
 * - 2 smaller images stacked on left
 * - 2 smaller images stacked on right
 * - Text overlays with title, description, and author
 * - Responsive design for mobile and tablet
 * 
 * Features:
 * - Elegant grid-based image showcase
 * - Title, description, and author info on each image
 * - Responsive: stacks to single column on mobile
 * - Smooth image transitions and text overlays
 * - Professional spacing and sizing
 */

import { cn } from "@/lib/utils";

export interface HeroImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  author: string;
}

interface HeroSectionProps {
  images: HeroImage[];
  height?: string;
}

/**
 * Reusable image card component with overlay text
 */
const ImageCard = ({
  image,
  isLarge = false,
}: {
  image: HeroImage;
  isLarge?: boolean;
}) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg shadow-md bg-gray-200 group",
      "h-full cursor-pointer"
    )}>
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      )} />

      {/* Text Content - Always visible */}
      <div className={cn(
        "absolute inset-0 flex flex-col justify-end p-3 md:p-4 text-white",
        "bg-gradient-to-t from-black/70 via-transparent to-transparent"
      )}>
        {/* Title */}
        <h3 className={cn(
          "font-display font-semibold text-white mb-1 line-clamp-2",
          isLarge ? "text-lg md:text-2xl" : "text-sm md:text-base"
        )}>
          {image.title}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-white/80 text-xs md:text-sm line-clamp-1 mb-2",
          "font-light leading-relaxed"
        )}>
          {image.description}
        </p>

        {/* Author */}
        <p className={cn(
          "text-white/60 text-xs",
          "font-medium border-t border-white/20 pt-2"
        )}>
          By {image.author}
        </p>
      </div>
    </div>
  );
};

export default function HeroSection({
  images = [
    {
      src: "https://images.unsplash.com/photo-1559599810-46d8c86c201d?w=500&h=600&fit=crop",
      alt: "Salon owner reviewing plans",
      title: "Grow Your Beauty Business",
      description: "Clarity, systems and community for salon, spa & barbershop owners in Africa.",
      author: "Spa & Salon African",
    },
    {
      src: "https://images.unsplash.com/photo-1562322503-54d46c5ee97f?w=500&h=300&fit=crop",
      alt: "Team meeting in salon",
      title: "Lead a Strong Team",
      description: "Practical leadership and operations tools for your staff and partners.",
      author: "Owner Stories",
    },
    {
      src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=700&fit=crop",
      alt: "African salon interior and clients",
      title: "Turn Your Space into a Brand",
      description: "Design experiences that keep clients returning and referring friends.",
      author: "Brand & Experience",
    },
    {
      src: "https://images.unsplash.com/photo-1556746753-b2646794e81d?w=500&h=300&fit=crop",
      alt: "Owner checking bookings on laptop",
      title: "Systems that Work for You",
      description: "Automate bookings, follow-ups and reporting without losing the human touch.",
      author: "Operations Lab",
    },
    {
      src: "https://images.unsplash.com/photo-1552821206-e8b60a9cf18b?w=500&h=600&fit=crop",
      alt: "Owners networking at an event",
      title: "Community Across Africa",
      description: "Learn, share and grow with other ambitious beauty entrepreneurs.",
      author: "Spa & Salon African Community",
    },
  ],
  height = "h-[500px] md:h-[700px] lg:h-[800px]",
}: HeroSectionProps) {
  // Ensure we have exactly 5 images
  const displayImages = images.slice(0, 5);

  return (
    <section className={cn("w-full relative overflow-hidden bg-background mt-2", height)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Mobile: single column stacked view */}
        <div className="md:hidden flex flex-col gap-4 h-full py-4">
          {displayImages.map((image, index) => (
            <div key={index} className="flex-1">
              <ImageCard image={image} />
            </div>
          ))}
        </div>

        {/* Tablet & Desktop: 3-column grid layout */}
        <div className="hidden md:grid h-full gap-4 grid-cols-4">
          {/* Left Column - 2 smaller images stacked */}
          <div className="flex flex-col gap-4 col-span-1">
            <div className="flex-1">
              <ImageCard image={displayImages[0]!} />
            </div>
            <div className="flex-1">
              <ImageCard image={displayImages[1]!} />
            </div>
          </div>

          {/* Center Column - 1 large image */}
          <div className="col-span-2">
            <ImageCard image={displayImages[2]!} isLarge />
          </div>

          {/* Right Column - 2 smaller images stacked */}
          <div className="flex flex-col gap-4 col-span-1">
            <div className="flex-1">
              <ImageCard image={displayImages[3]!} />
            </div>
            <div className="flex-1">
              <ImageCard image={displayImages[4]!} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
