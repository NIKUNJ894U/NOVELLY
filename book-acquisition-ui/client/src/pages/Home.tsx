import { useState } from "react";
import { Link } from "wouter";
import { Search, ShoppingCart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BOOKS, CATEGORIES } from "@/lib/bookData";
import BookCard from "@/components/BookCard";
import CategoryNav from "@/components/CategoryNav";
import Header from "@/components/Header";

/**
 * Home Page - BookVerse Main Hub
 * 
 * Design Philosophy: Warm Minimalist Library Aesthetic
 * - Cream backgrounds with terracotta/sage green accents
 * - Serif headers (Merriweather) with sans-serif body (Poppins)
 * - Generous whitespace and asymmetric layouts
 * - Soft, rounded corners and warm gradients
 */

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter books based on category and search
  const filteredBooks = BOOKS.filter((book) => {
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Featured Books */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl text-foreground leading-tight" style={{fontFamily: "'Merriweather', serif"}}>
                  Discover Your Next
                  <span className="block text-primary"> Great Read</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Browse thousands of books across every genre. Rent from nearby libraries or purchase instantly.
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex gap-2 pt-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Now
                </Button>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right: Featured Books Display */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-full max-w-sm h-96">
                {/* Featured book 1 - Main */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={BOOKS[0].coverImage}
                      alt={BOOKS[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Featured book 2 - Offset */}
                <div className="absolute top-12 -right-8 w-40 h-60 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-75 hover:opacity-100">
                  <img
                    src={BOOKS[1].coverImage}
                    alt={BOOKS[1].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Books Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="space-y-2">
            <h2 className="text-4xl text-foreground" style={{fontFamily: "'Merriweather', serif"}}>
              {selectedCategory
                ? CATEGORIES.find((c) => c.id === selectedCategory)?.name
                : searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "All Books"}
            </h2>
            <p className="text-muted-foreground">
              {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                  <a>
                    <BookCard book={book} />
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse different categories
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-muted/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>About BookVerse</h4>
              <p className="text-sm text-muted-foreground">
                Your gateway to endless stories and knowledge across every genre.
              </p>
            </div>
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Browse Books</a></li>
                <li><a href="#" className="hover:text-primary transition">My Library</a></li>
                <li><a href="#" className="hover:text-primary transition">Rentals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BookVerse. All rights reserved. Curated for book lovers, everywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
