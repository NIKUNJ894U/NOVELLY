import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export const CATEGORIES = [
  { id: "psychology", name: "Psychology", color: "#C85A3A" },
  { id: "horror", name: "Horror", color: "#7A9B7F" },
  { id: "thriller", name: "Thriller", color: "#D4A574" },
  { id: "slice-of-life", name: "Slice of Life", color: "#6B5B4F" },
  { id: "romance", name: "Romance", color: "#A0522D" },
  { id: "sci-fi", name: "Science Fiction", color: "#8B7355" },
  { id: "mystery", name: "Mystery", color: "#B8860B" },
  { id: "fantasy", name: "Fantasy", color: "#9370DB" },
];

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="bg-background/95 backdrop-blur border-b border-border sticky top-[72px] z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          {/* "All Books" Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
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
          </motion.div>

          {/* Category Buttons */}
          {CATEGORIES.map((category) => (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
              <Button
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
            </motion.div>
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
