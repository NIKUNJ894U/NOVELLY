export const USER_RENTALS = [
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
];

export const USER_PURCHASES = [
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
];

export const USER_WISHLIST = [
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
];

export function calculateDaysRemaining(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getStatusColor(status) {
  switch (status) {
    case "active":
      return "#7A9B7F";
    case "overdue":
      return "#C85A3A";
    case "completed":
      return "#9B9B9B";
    default:
      return "#D4A574";
  }
}
