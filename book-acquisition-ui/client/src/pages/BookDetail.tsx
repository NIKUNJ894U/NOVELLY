import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Star, MapPin, ShoppingCart, Heart, Share2, ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKS, CATEGORIES } from "@/lib/bookData";
import Header from "@/components/Header";

/**
 * Book Detail Page
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Large hero book cover image
 * - Detailed metadata and availability options
 * - Review section with ratings
 * - Rent/Purchase action buttons
 */

export default function BookDetail() {
  const [, params] = useRoute("/book/:id");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"rent" | "purchase" | null>(null);

  const bookId = params?.id;
  const book = BOOKS.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The book you're looking for doesn't exist.
          </p>
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

  const category = CATEGORIES.find((c) => c.id === book.category);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm">
          <Link href="/">
            <a className="text-primary hover:underline">Books</a>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/">
            <a className="text-primary hover:underline">{category?.name}</a>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{book.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Book Cover */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {book.availability.rentNearby && (
                  <Button
                    onClick={() => setSelectedAction("rent")}
                    className={`w-full h-12 transition-all ${
                      selectedAction === "rent"
                        ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        : "bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground border border-secondary/30"
                    }`}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Rent from ${book.rentPrice.toFixed(2)}
                  </Button>
                )}

                {book.availability.purchase && (
                  <Button
                    onClick={() => setSelectedAction("purchase")}
                    className={`w-full h-12 transition-all ${
                      selectedAction === "purchase"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy for ${book.price.toFixed(2)}
                  </Button>
                )}

                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
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

                <Button variant="outline" className="w-full h-12 border-border text-foreground hover:bg-muted">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              {/* Availability Info */}
              {book.availability.rentNearby && (
                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-sm font-medium text-foreground mb-1">Available to Rent</p>
                  <p className="text-sm text-muted-foreground">
                    {book.availability.nearbyLibraries} libraries near you
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: category?.color }}
                  >
                    {category?.name}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
              </div>

              {/* Rating */}
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

            {/* Book Metadata */}
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
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Category</p>
                <p className="text-lg font-bold text-foreground">{category?.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Format</p>
                <p className="text-lg font-bold text-foreground">Paperback</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
                About This Book
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6 pt-8 border-t border-border">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Merriweather', serif" }}>
                  Reader Reviews
                </h2>
                <p className="text-muted-foreground">
                  {book.reviewCount} verified reviews from readers like you
                </p>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-muted/20 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground">{review.text}</p>
                  </div>
                ))}
              </div>

              {/* Load More Reviews */}
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                Load More Reviews
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Books Section */}
      <section className="bg-muted/30 border-t border-border mt-16 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "'Merriweather', serif" }}>
            You Might Also Like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOOKS.filter((b) => b.category === book.category && b.id !== book.id)
              .slice(0, 4)
              .map((relatedBook) => (
                <Link key={relatedBook.id} href={`/book/${relatedBook.id}`}>
                  <a className="group">
                    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-all">
                      <div className="aspect-[3/4] overflow-hidden bg-muted">
                        <img
                          src={relatedBook.coverImage}
                          alt={relatedBook.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Merriweather', serif" }}>
                          {relatedBook.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{relatedBook.author}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(relatedBook.rating)
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {relatedBook.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
