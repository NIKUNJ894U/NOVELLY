import { Star, MapPin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/bookData";

/**
 * BookCard Component
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Soft rounded corners and subtle shadows
 * - Hover effects reveal metadata and action buttons
 * - Warm color accents for ratings and availability
 */

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group h-full flex flex-col bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/30">
      {/* Book Cover Image */}
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            {book.availability.rentNearby && (
              <Button size="sm" variant="outline" className="w-full bg-background/90 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                Rent Nearby
              </Button>
            )}
            {book.availability.purchase && (
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
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
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(book.rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {book.rating}
          </span>
          <span className="text-xs text-muted-foreground">
            ({book.reviewCount})
          </span>
        </div>

        {/* Availability Status */}
        <div className="flex items-center gap-2 text-xs">
          {book.availability.rentNearby && (
            <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-full">
              Rent Available
            </span>
          )}
          {book.availability.purchase && (
            <span className="px-2 py-1 bg-primary/20 text-primary rounded-full">
              For Sale
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-border">
          <span className="text-lg font-bold text-foreground">
            ${book.price.toFixed(2)}
          </span>
          {book.rentPrice && (
            <span className="text-sm text-muted-foreground">
              or rent from ${book.rentPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
