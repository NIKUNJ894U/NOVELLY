/**
 * Library Data - User's rentals, purchases, and wishlist
 * 
 * Design: Warm Minimalist Library Aesthetic
 * - Structured data for tracking active rentals with due dates
 * - Purchase history with acquisition dates
 * - Wishlist management
 */

export interface RentalItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  rentalDate: string;
  dueDate: string;
  daysRemaining: number;
  rentalPrice: number;
  libraryName: string;
  status: "active" | "overdue" | "completed";
}

export interface PurchaseItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  purchaseDate: string;
  price: number;
  format: "paperback" | "hardcover" | "ebook";
  rating: number;
}

export interface WishlistItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  price: number;
  addedDate: string;
  priority: "high" | "medium" | "low";
}

// Sample user library data
export const USER_RENTALS: RentalItem[] = [
  {
    id: "rental-1",
    bookId: "1",
    title: "The Psychology of Well-Being",
    author: "Dr. Elena Morgan",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop",
    rentalDate: "2026-04-20",
    dueDate: "2026-05-18",
    daysRemaining: 14,
    rentalPrice: 4.99,
    libraryName: "Central City Library",
    status: "active",
  },
  {
    id: "rental-2",
    bookId: "3",
    title: "Midnight Whispers",
    author: "Sarah Chen",
    coverImage: "https://images.unsplash.com/photo-1543002588-d83cea6bafff?w=300&h=450&fit=crop",
    rentalDate: "2026-04-25",
    dueDate: "2026-05-09",
    daysRemaining: -2,
    rentalPrice: 3.99,
    libraryName: "Downtown Library Branch",
    status: "overdue",
  },
  {
    id: "rental-3",
    bookId: "5",
    title: "The Last Horizon",
    author: "Marcus Webb",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop",
    rentalDate: "2026-05-01",
    dueDate: "2026-05-29",
    daysRemaining: 25,
    rentalPrice: 5.99,
    libraryName: "Riverside Library",
    status: "active",
  },
];

export const USER_PURCHASES: PurchaseItem[] = [
  {
    id: "purchase-1",
    bookId: "2",
    title: "The Silent Truth",
    author: "Harper Langley",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop",
    purchaseDate: "2026-03-15",
    price: 24.99,
    format: "hardcover",
    rating: 4.8,
  },
  {
    id: "purchase-2",
    bookId: "4",
    title: "Echoes of Tomorrow",
    author: "James Mitchell",
    coverImage: "https://images.unsplash.com/photo-1543002588-d83cea6bafff?w=300&h=450&fit=crop",
    purchaseDate: "2026-02-28",
    price: 18.99,
    format: "paperback",
    rating: 4.5,
  },
  {
    id: "purchase-3",
    bookId: "6",
    title: "Whispers in the Garden",
    author: "Lisa Anderson",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop",
    purchaseDate: "2026-01-10",
    price: 16.99,
    format: "paperback",
    rating: 4.6,
  },
  {
    id: "purchase-4",
    bookId: "8",
    title: "The Quantum Paradox",
    author: "Dr. Robert Chen",
    coverImage: "https://images.unsplash.com/photo-1543002588-d83cea6bafff?w=300&h=450&fit=crop",
    purchaseDate: "2025-12-20",
    price: 22.99,
    format: "hardcover",
    rating: 4.7,
  },
];

export const USER_WISHLIST: WishlistItem[] = [
  {
    id: "wishlist-1",
    bookId: "7",
    title: "Mindfulness in Motion",
    author: "Dr. James Wilson",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop",
    category: "Psychology",
    price: 19.99,
    addedDate: "2026-04-10",
    priority: "high",
  },
  {
    id: "wishlist-2",
    bookId: "9",
    title: "The Hidden Kingdom",
    author: "Emma Stone",
    coverImage: "https://images.unsplash.com/photo-1543002588-d83cea6bafff?w=300&h=450&fit=crop",
    category: "Fantasy",
    price: 21.99,
    addedDate: "2026-04-05",
    priority: "medium",
  },
  {
    id: "wishlist-3",
    bookId: "10",
    title: "Cosmic Mysteries",
    author: "Dr. Neil Patterson",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=450&fit=crop",
    category: "Science Fiction",
    price: 23.99,
    addedDate: "2026-03-20",
    priority: "low",
  },
];

// Helper function to calculate days remaining
export function calculateDaysRemaining(dueDate: string): number {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Helper function to get status color
export function getStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "#7A9B7F"; // sage green
    case "overdue":
      return "#C85A3A"; // terracotta
    case "completed":
      return "#9B9B9B"; // gray
    default:
      return "#D4A574"; // warm gold
  }
}
