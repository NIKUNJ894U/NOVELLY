import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, BookOpen, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import CategoryNav, { CATEGORIES } from "@/components/CategoryNav";
import { BOOKS } from "@/data/mockData";
import { useLibrary } from "@/contexts/LibraryContext";

export default function Home({ locationState, onNearbyClick }) {
  const { rentals, purchases, wishlist } = useLibrary();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState(BOOKS);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Recommendation Logic
  useEffect(() => {
    const allUserBooks = [...rentals, ...purchases, ...wishlist];
    
    if (allUserBooks.length === 0) {
      // If new user, recommend top rated
      setRecommendations(BOOKS.filter(b => b.rating >= 4.8).slice(0, 4));
      return;
    }

    // Find most frequent genre
    const genres = allUserBooks.map(b => b.genre || b.category).filter(Boolean);
    const genreCounts = genres.reduce((acc, g) => ({ ...acc, [g]: (acc[g] || 0) + 1 }), {});
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

    // Find books in top genre not already in library
    const userBookIds = new Set(allUserBooks.map(b => b.bookId));
    const suggested = BOOKS.filter(b => 
      (b.genre === topGenre || b.category === topGenre) && 
      !userBookIds.has(b.id)
    ).slice(0, 4);

    // Fallback if top genre has no more books
    if (suggested.length < 2) {
      setRecommendations(BOOKS.filter(b => b.rating >= 4.7 && !userBookIds.has(b.id)).slice(0, 4));
    } else {
      setRecommendations(suggested);
    }
  }, [rentals, purchases, wishlist]);

  useEffect(() => {
    setLoading(true);
    const filtered = BOOKS.filter(book => {
      const matchesCategory = !selectedCategory || 
        book.genre.toLowerCase() === selectedCategory.toLowerCase().replace(/-/g, ' ') ||
        (selectedCategory === 'sci-fi' && book.genre.toLowerCase() === 'science fiction');
      
      const matchesSearch = !searchQuery || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setBooks(filtered);
    setLoading(false);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl text-foreground leading-tight" style={{fontFamily: "'Merriweather', serif"}}>
                  Discover Your Next
                  <span className="block text-primary"> Great Read</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover 10,000+ titles and rent from {locationState?.libraries?.length > 0 ? `${locationState.libraries.length} verified` : 'premium'} nearby libraries across India.
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
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted" onClick={onNearbyClick}>
                  Nearby Libraries
                </Button>
              </div>
            </div>

            {/* Right: Featured Display */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-full max-w-sm h-96">
                {books.length > 0 && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <img
                          src={books[0].cover}
                          alt={books[0].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {books.length > 1 && (
                      <div className="absolute top-12 -right-8 w-40 h-60 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-75 hover:opacity-100">
                        <img
                          src={books[1].cover}
                          alt={books[1].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Recommendations Section */}
      {!selectedCategory && !searchQuery && recommendations.length > 0 && (
        <section className="bg-muted/30 py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground" style={{fontFamily: "'Merriweather', serif"}}>Recommended for You</h2>
                <p className="text-sm text-muted-foreground">Based on your recent activity and preferences</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((book) => (
                <Link key={`rec-${book.id}`} href={`/book/${book.id}`}>
                  <BookCard book={book} onRentClick={onNearbyClick} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Books Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl text-foreground" style={{fontFamily: "'Merriweather', serif"}}>
              {selectedCategory
                ? CATEGORIES.find((c) => c.id === selectedCategory)?.name
                : searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : "Discovery Library"}
            </h2>
            <p className="text-muted-foreground">
              {books.length} book{books.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground animate-pulse">Scanning the literary universe...</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                  <BookCard book={book} onRentClick={onNearbyClick} />
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

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>About NOVELLY</h4>
              <p className="text-sm">
                NOVELLY is a premium book rental and discovery platform designed for the modern reader.
 Bridging the gap between digital search and physical reading.
              </p>
            </div>
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Browse Books</a></li>
                <li><a href="#" className="hover:text-primary transition">My Library</a></li>
                <li><a href="#" className="hover:text-primary transition" onClick={onNearbyClick}>Nearby Libraries</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 NOVELLY. Designed for the Indian Reading Community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
