import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Filter Sidebar Component
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Collapsible filter sections
 * - Price range slider
 * - Rating filter
 * - Availability options
 */

export interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  availability: {
    purchase: boolean;
    rent: boolean;
  };
  publishedYear: {
    min: number;
    max: number;
  };
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["price", "rating", "availability"])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    if (newRange[0] <= newRange[1]) {
      onFiltersChange({ ...filters, priceRange: newRange });
    }
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const handleAvailabilityChange = (type: "purchase" | "rent", checked: boolean) => {
    onFiltersChange({
      ...filters,
      availability: {
        ...filters.availability,
        [type]: checked,
      },
    });
  };

  const isFiltered =
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 50 ||
    filters.minRating > 0 ||
    !filters.availability.purchase ||
    !filters.availability.rent;

  return (
    <div className="w-full md:w-64 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
          Filters
        </h2>
        {isFiltered && (
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-foreground font-medium hover:text-primary transition-colors"
        >
          <span>Price Range</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.has("price") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.has("price") && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Min: ${filters.priceRange[0].toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Max: ${filters.priceRange[1].toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection("rating")}
          className="w-full flex items-center justify-between text-foreground font-medium hover:text-primary transition-colors"
        >
          <span>Minimum Rating</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.has("rating") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.has("rating") && (
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.minRating === rating}
                  onChange={(e) => handleRatingChange(rating)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-foreground">
                  {rating}+ Stars ({5 - rating} reviews)
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between text-foreground font-medium hover:text-primary transition-colors"
        >
          <span>Availability</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.has("availability") ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.has("availability") && (
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availability.purchase}
                onChange={(e) => handleAvailabilityChange("purchase", e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-foreground">For Purchase</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availability.rent}
                onChange={(e) => handleAvailabilityChange("rent", e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-foreground">Available to Rent</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
