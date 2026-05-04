import { Star, MapPin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BookCard({ book, onClick, onRentClick }) {
  // Adaptation for existing API data structure
  const title = book.title;
  const author = book.author;
  const coverImage = book.cover || book.coverImage;
  const rating = parseFloat(book.rating) || 4.5;
  const price = book.price || 299;
  const rentPrice = book.rentPrice || 49;
  const reviewCount = book.reviewCount || Math.floor(Math.random() * 500) + 100;
  
  // Mock availability if missing
  const availability = book.availability || {
    purchase: true,
    rentNearby: true,
    nearbyLibraries: 5
  };

  return (
    <motion.div 
      onClick={() => onClick?.(book)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group h-full flex flex-col bg-card rounded-[1.5rem] overflow-hidden border border-border hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-200 hover:border-primary/50 cursor-pointer"
    >
      {/* Book Cover Image */}
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            {availability.rentNearby && (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full bg-background/90 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onRentClick?.();
                }}
              >
                <MapPin className="w-4 h-4 mr-1" />
                Rent Nearby
              </Button>
            )}
            {availability.purchase && (
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  if (book.purchaseLink) window.open(book.purchaseLink, '_blank');
                  else window.open(`https://www.amazon.in/s?k=${encodeURIComponent(title)}`, '_blank');
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Purchase
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Title and Author */}
        <div className="space-y-1">
          <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors" style={{fontFamily: "'Merriweather', serif"}}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {author}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {rating}
          </span>
          <span className="text-xs text-muted-foreground">
            ({reviewCount})
          </span>
        </div>

        {/* Availability Status */}
        <div className="flex items-center gap-2 text-xs">
          {availability.rentNearby && (
            <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-full">
              Rent Available
            </span>
          )}
          {availability.purchase && (
            <span className="px-2 py-1 bg-primary/20 text-primary rounded-full">
              For Sale
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-border">
          <span className="text-lg font-bold text-foreground">
            ₹{price}
          </span>
          {rentPrice && (
            <span className="text-sm text-muted-foreground">
              or rent from ₹{rentPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
