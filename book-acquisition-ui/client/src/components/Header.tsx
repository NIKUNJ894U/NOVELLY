import { Link } from "wouter";
import { BookOpen, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Header Component
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Clean navigation with terracotta accent for primary brand color
 * - Serif logo with sans-serif nav items
 * - Subtle shadow and rounded corners
 */

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline" style={{fontFamily: "'Merriweather', serif"}}>
              BookVerse
            </span>
          </a>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            Browse
          </a>
          <Link href="/my-library">
            <a className="text-foreground hover:text-primary transition-colors font-medium">
              My Library
            </a>
          </Link>
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            Rentals
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            About
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-muted">
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">Wishlist</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-muted">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline ml-2">Cart</span>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
