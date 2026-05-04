import { CATEGORIES } from "@/lib/bookData";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

/**
 * CategoryNav Component
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Horizontal scrollable category buttons
 * - Warm color accents matching the design palette
 * - Smooth transitions and hover effects
 */

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <section className="bg-muted/30 border-b border-border sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          {/* "All Books" Button */}
          <Button
            onClick={() => onSelectCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className={`whitespace-nowrap transition-all ${
              selectedCategory === null
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "border-border text-foreground hover:bg-muted"
            }`}
          >
            All Books
          </Button>

          {/* Category Buttons */}
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "border-border text-foreground hover:bg-muted"
              }`}
              style={
                selectedCategory === category.id
                  ? { backgroundColor: category.color, borderColor: category.color }
                  : {}
              }
            >
              {category.name}
            </Button>
          ))}

          {/* Clear Filter Button (if active) */}
          {selectedCategory && (
            <Button
              onClick={() => onSelectCategory(null)}
              variant="ghost"
              size="sm"
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
