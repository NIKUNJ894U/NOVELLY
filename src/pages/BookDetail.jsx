import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Star, MapPin, ShoppingCart, Heart, Share2, ArrowLeft, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookDetails } from "@/services/api";
import { CATEGORIES } from "@/components/CategoryNav";
import { BOOKS } from "@/data/mockData";
import { useLibrary } from "@/contexts/LibraryContext";
import { toast } from "sonner";

export default function BookDetail({ id, onNearbyClick }) {
  const [, params] = useRoute("/book/:id");
  const { addToRentals, addToPurchases, wishlist, toggleWishlist } = useLibrary();
  const [selectedAction, setSelectedAction] = useState(null);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookId = params?.id;
  const isWishlisted = wishlist.some(item => item.bookId?.toString() === bookId?.toString());

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      setLoading(true);
      
      // Try to find in mock data first
      const mockBook = BOOKS.find(b => b.id.toString() === bookId.toString());
      if (mockBook) {
        setBook({
          ...mockBook,
          coverImage: mockBook.cover,
          category: mockBook.genre.toLowerCase(),
          reviewCount: 120,
          pages: 350,
          publishedYear: 2020,
          rentPrice: mockBook.rentPrice || 49,
          price: mockBook.price || 350,
          availability: { purchase: true, rentNearby: true, nearbyLibraries: 5 },
          reviews: [
            { id: "r1", author: "Sarah K.", rating: 5, text: "Life-changing insights. Highly recommend!", date: "2024-03-15" },
            { id: "r2", author: "Marcus T.", rating: 4, text: "Great practical advice.", date: "2024-02-28" },
          ]
        });
        setLoading(false);
        return;
      }

      const data = await getBookDetails(bookId);
      
      // Adapt Google Books API data
      if (data) {
        const info = data.volumeInfo;
        setBook({
          id: data.id,
          title: info.title,
          author: info.authors ? info.authors.join(', ') : 'Unknown Author',
          category: info.categories ? info.categories[0].toLowerCase() : 'general',
          rating: info.averageRating || 4.5,
          reviewCount: info.ratingsCount || 120,
          coverImage: info.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://images.unsplash.com/photo-1543005127-d162c5a3b2b3?auto=format&fit=crop&q=80&w=400',
          description: info.description || 'No description available.',
          pages: info.pageCount || 'N/A',
          publishedYear: info.publishedDate?.split('-')[0] || 'N/A',
          price: 299, // Mock
          rentPrice: 49, // Mock
          availability: { purchase: true, rentNearby: true, nearbyLibraries: 5 },
          reviews: [
            { id: "r1", author: "Sarah K.", rating: 5, text: "Life-changing insights. Highly recommend!", date: "2024-03-15" },
            { id: "r2", author: "Marcus T.", rating: 4, text: "Great practical advice.", date: "2024-02-28" },
          ]
        });
      }
      setLoading(false);
    };
    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground animate-pulse">Fetching book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
          <Link href="/">
            <a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === book.category || c.name.toLowerCase() === book.category.toLowerCase());

  return (
    <div className="min-h-screen bg-background">

      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <Link href="/">
            <a className="text-primary hover:underline">Books</a>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{book.title}</span>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>

              <div className="space-y-3">
                {book.availability.rentNearby && (
                  <Button
                    onClick={() => {
                      setSelectedAction("rent");
                      addToRentals(book, "Central City Library");
                      toast.success(`Book reserved! Opening Nearby Libraries...`);
                      onNearbyClick?.();
                    }}
                    className={`w-full h-12 transition-all ${
                      selectedAction === "rent"
                        ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        : "bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground border border-secondary/30"
                    }`}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Rent from ₹{book.rentPrice}
                  </Button>
                )}

                {book.availability.purchase && (
                  <Button
                    onClick={() => {
                      setSelectedAction("purchase");
                      addToPurchases(book);
                      toast.success(`Recording purchase. Redirecting to retailer...`);
                      if (book.purchaseLink) window.open(book.purchaseLink, '_blank');
                      else window.open(`https://www.amazon.in/s?k=${encodeURIComponent(book.title)}`, '_blank');
                    }}
                    className={`w-full h-12 transition-all ${
                      selectedAction === "purchase"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy for ₹{book.price}
                  </Button>
                )}

                <p className="text-[10px] text-muted-foreground text-center pt-2 uppercase tracking-tighter opacity-70">
                  * Prices may differ on the original product
                </p>

                <Button
                  onClick={() => {
                    const added = toggleWishlist(book);
                    toast.success(added ? "Added to Wishlist!" : "Removed from Wishlist");
                  }}
                  variant="outline"
                  className={`w-full h-12 transition-all ${
                    isWishlisted
                      ? "bg-accent/20 border-accent text-accent"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full h-12 border-border text-foreground hover:bg-muted"
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.share) {
                      navigator.share({
                        title: book.title,
                        text: `Check out ${book.title} on NOVELLY!`,
                        url: url,
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(url);
                      toast.success("Product link copied to clipboard!");
                    }
                  }}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-foreground">{book.rating}</span>
                  <span className="text-muted-foreground">({book.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-lg border border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Pages</p>
                <p className="text-lg font-bold text-foreground">{book.pages}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Published</p>
                <p className="text-lg font-bold text-foreground">{book.publishedYear}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Format</p>
                <p className="text-lg font-bold text-foreground">Paperback</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
                About This Book
              </h2>
              <div 
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: book.description || book.synopsis }}
              />
            </div>

            <div className="space-y-6 pt-8 border-t border-border">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
                  Reader Reviews
                </h2>
                <p className="text-muted-foreground">{book.reviewCount} verified reviews</p>
              </div>

              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
