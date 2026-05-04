import { useState } from "react";
import { Link } from "wouter";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Heart,
  Trash2,
  Download,
  MoreVertical,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  USER_RENTALS,
  USER_PURCHASES,
  USER_WISHLIST,
  formatDate,
  calculateDaysRemaining,
  type RentalItem,
  type PurchaseItem,
  type WishlistItem,
} from "@/lib/libraryData";

/**
 * My Library Dashboard Page
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Tabbed interface for Rentals, Purchases, and Wishlist
 * - Active rentals with due date countdown timers
 * - Purchase history with ratings and formats
 * - Wishlist management with priority levels
 * - Status indicators and action buttons
 */

type TabType = "rentals" | "purchases" | "wishlist";

export default function MyLibrary() {
  const [activeTab, setActiveTab] = useState<TabType>("rentals");
  const [rentals, setRentals] = useState<RentalItem[]>(USER_RENTALS);
  const [purchases, setPurchases] = useState<PurchaseItem[]>(USER_PURCHASES);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(USER_WISHLIST);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleRemoveRental = (id: string) => {
    setRentals(rentals.filter((item) => item.id !== id));
  };

  const getStatusBadge = (status: string, daysRemaining: number) => {
    if (status === "overdue") {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-destructive/10 border border-destructive/30 rounded-full">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-xs font-medium text-destructive">Overdue</span>
        </div>
      );
    }

    if (daysRemaining <= 3) {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 border border-accent/30 rounded-full">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-xs font-medium text-accent">Due Soon</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full">
        <CheckCircle className="w-4 h-4 text-secondary" />
        <span className="text-xs font-medium text-secondary">Active</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1
            className="text-4xl font-bold text-foreground mb-2"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            My Library
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your rentals, purchases, and wishlist all in one place
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-border sticky top-16 z-30 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {[
              { id: "rentals" as TabType, label: "Active Rentals", count: rentals.length },
              { id: "purchases" as TabType, label: "My Purchases", count: purchases.length },
              { id: "wishlist" as TabType, label: "Wishlist", count: wishlist.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 transition-colors font-medium ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-sm bg-muted px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="container mx-auto px-4 py-12">
        {/* Active Rentals Tab */}
        {activeTab === "rentals" && (
          <div className="space-y-6">
            {rentals.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Active Rentals
                </h3>
                <p className="text-muted-foreground mb-6">
                  Browse our collection to rent your next book
                </p>
                <Link href="/">
                  <a>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Browse Books
                    </Button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex gap-6 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <img
                        src={rental.coverImage}
                        alt={rental.title}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3
                          className="text-lg font-bold text-foreground"
                          style={{ fontFamily: "'Merriweather', serif" }}
                        >
                          {rental.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{rental.author}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        {getStatusBadge(rental.status, rental.daysRemaining)}
                        <span className="text-sm text-muted-foreground">
                          {rental.libraryName}
                        </span>
                      </div>

                      {/* Due Date Info */}
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Rental Date
                          </p>
                          <p className="font-medium text-foreground">
                            {formatDate(rental.rentalDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Due Date
                          </p>
                          <p
                            className={`font-medium ${
                              rental.status === "overdue"
                                ? "text-destructive"
                                : rental.daysRemaining <= 3
                                  ? "text-accent"
                                  : "text-foreground"
                            }`}
                          >
                            {formatDate(rental.dueDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Days Remaining
                          </p>
                          <p
                            className={`text-lg font-bold ${
                              rental.status === "overdue"
                                ? "text-destructive"
                                : rental.daysRemaining <= 3
                                  ? "text-accent"
                                  : "text-secondary"
                            }`}
                          >
                            {rental.daysRemaining > 0
                              ? `${rental.daysRemaining} days`
                              : `${Math.abs(rental.daysRemaining)} days overdue`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-foreground hover:bg-muted"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Renew
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-foreground hover:bg-muted"
                        onClick={() => handleRemoveRental(rental.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Return
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Purchases Tab */}
        {activeTab === "purchases" && (
          <div className="space-y-6">
            {purchases.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Purchases Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start building your personal library by purchasing books
                </p>
                <Link href="/">
                  <a>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Browse Books
                    </Button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex flex-col p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    {/* Book Cover */}
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={purchase.coverImage}
                        alt={purchase.title}
                        className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3
                          className="font-bold text-foreground line-clamp-2"
                          style={{ fontFamily: "'Merriweather', serif" }}
                        >
                          {purchase.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{purchase.author}</p>
                      </div>

                      {/* Format and Price */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-2 py-1 bg-muted rounded text-muted-foreground capitalize">
                          {purchase.format}
                        </span>
                        <span className="font-semibold text-foreground">
                          ${purchase.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(purchase.rating)
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {purchase.rating}
                        </span>
                      </div>

                      {/* Purchase Date */}
                      <p className="text-xs text-muted-foreground">
                        Purchased on {formatDate(purchase.purchaseDate)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border text-foreground hover:bg-muted"
                      >
                        Read
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border text-foreground hover:bg-muted"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Your Wishlist is Empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add books to your wishlist to keep track of titles you want to read
                </p>
                <Link href="/">
                  <a>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Explore Books
                    </Button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3
                          className="text-lg font-bold text-foreground"
                          style={{ fontFamily: "'Merriweather', serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.author}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: "#7A9B7F" }}
                        >
                          {item.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.priority === "high"
                              ? "bg-destructive/10 text-destructive"
                              : item.priority === "medium"
                                ? "bg-accent/10 text-accent"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Price
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Added
                          </p>
                          <p className="text-sm text-foreground">{formatDate(item.addedDate)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 justify-center">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        className="border-border text-foreground hover:bg-muted"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Summary Stats Section */}
      {rentals.length > 0 || purchases.length > 0 || wishlist.length > 0 ? (
        <section className="bg-muted/30 border-t border-border mt-16 py-12">
          <div className="container mx-auto px-4">
            <h2
              className="text-2xl font-bold text-foreground mb-8"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              Library Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Active Rentals
                </p>
                <p className="text-3xl font-bold text-foreground">{rentals.length}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {rentals.filter((r) => r.status === "overdue").length} overdue
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Total Purchases
                </p>
                <p className="text-3xl font-bold text-foreground">{purchases.length}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Total spent: $
                  {purchases.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Wishlist Items
                </p>
                <p className="text-3xl font-bold text-foreground">{wishlist.length}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Total value: $
                  {wishlist.reduce((sum, w) => sum + w.price, 0).toFixed(2)}
                </p>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Average Rating
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {purchases.length > 0
                    ? (
                        purchases.reduce((sum, p) => sum + p.rating, 0) / purchases.length
                      ).toFixed(1)
                    : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  From {purchases.length} books
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
