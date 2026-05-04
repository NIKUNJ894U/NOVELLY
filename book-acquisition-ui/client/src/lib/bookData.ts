export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rentPrice: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  description: string;
  pages: number;
  publishedYear: number;
  reviews: Review[];
  availability: {
    purchase: boolean;
    rentNearby: boolean;
    nearbyLibraries: number;
  };
}

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

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "The Psychology of Well-Being",
    author: "Dr. Elena Morgan",
    category: "psychology",
    price: 24.99,
    rentPrice: 4.99,
    rating: 4.8,
    reviewCount: 342,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/featured-book-psychology-Wj7LTfUmRoDmkh9dgjxnoe.webp",
    description: "A comprehensive guide to understanding the human mind and achieving emotional balance through evidence-based psychological principles.",
    pages: 384,
    publishedYear: 2023,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 5 },
    reviews: [
      { id: "r1", author: "Sarah K.", rating: 5, text: "Life-changing insights backed by science. Highly recommend!", date: "2024-03-15" },
      { id: "r2", author: "Marcus T.", rating: 4, text: "Great practical advice, though some concepts are dense.", date: "2024-02-28" },
      { id: "r3", author: "Jennifer L.", rating: 5, text: "Finally a psychology book that's both accessible and profound.", date: "2024-01-20" },
    ],
  },
  {
    id: "2",
    title: "The Silent Truth",
    author: "Harper Langley",
    category: "thriller",
    price: 18.99,
    rentPrice: 3.99,
    rating: 4.6,
    reviewCount: 521,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/featured-book-thriller-bkEMyz2Tw4sNGop7s25wBB.webp",
    description: "A gripping psychological thriller about secrets buried deep and the price of truth. Perfect for readers who love suspenseful twists.",
    pages: 352,
    publishedYear: 2024,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 8 },
    reviews: [
      { id: "r1", author: "David M.", rating: 5, text: "Couldn't put it down! The plot twists are incredible.", date: "2024-04-10" },
      { id: "r2", author: "Emma R.", rating: 4, text: "Excellent thriller with well-developed characters.", date: "2024-03-25" },
      { id: "r3", author: "James P.", rating: 5, text: "One of the best thrillers I've read in years.", date: "2024-02-14" },
    ],
  },
  {
    id: "3",
    title: "Midnight in the Library",
    author: "Claire Summers",
    category: "slice-of-life",
    price: 16.99,
    rentPrice: 2.99,
    rating: 4.7,
    reviewCount: 289,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/book-slice-of-life-SimMrnn5ca8s4HTpAmsGg4.webp",
    description: "A heartwarming story about finding connection and purpose in unexpected places. A perfect read for quiet evenings.",
    pages: 298,
    publishedYear: 2023,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 6 },
    reviews: [
      { id: "r1", author: "Lisa W.", rating: 5, text: "So cozy and comforting. Exactly what I needed.", date: "2024-04-05" },
      { id: "r2", author: "Robert H.", rating: 4, text: "Beautiful writing, touching story.", date: "2024-03-18" },
    ],
  },
  {
    id: "4",
    title: "Echoes of the Void",
    author: "Marcus Chen",
    category: "sci-fi",
    price: 22.99,
    rentPrice: 4.49,
    rating: 4.5,
    reviewCount: 198,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/featured-book-psychology-Wj7LTfUmRoDmkh9dgjxnoe.webp",
    description: "An epic space opera exploring humanity's place in the universe. Stunning world-building and philosophical depth.",
    pages: 456,
    publishedYear: 2024,
    availability: { purchase: true, rentNearby: false, nearbyLibraries: 3 },
    reviews: [
      { id: "r1", author: "Alex K.", rating: 5, text: "Absolutely mind-bending! The scope is incredible.", date: "2024-04-08" },
      { id: "r2", author: "Nina S.", rating: 4, text: "Great sci-fi, though a bit complex at times.", date: "2024-03-30" },
    ],
  },
  {
    id: "5",
    title: "The Haunting Hour",
    author: "Victoria Black",
    category: "horror",
    price: 19.99,
    rentPrice: 3.49,
    rating: 4.4,
    reviewCount: 267,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/book-horror-TJpmwU3tdj5JfbfP6hYBaV.webp",
    description: "A chilling tale of supernatural terror that will keep you up at night. Not for the faint of heart.",
    pages: 328,
    publishedYear: 2023,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 4 },
    reviews: [
      { id: "r1", author: "Tom B.", rating: 5, text: "Genuinely terrifying. Loved every moment!", date: "2024-03-22" },
      { id: "r2", author: "Sophie D.", rating: 4, text: "Scary but well-written. Great atmosphere.", date: "2024-02-10" },
    ],
  },
  {
    id: "6",
    title: "Love in the City",
    author: "Amelia Rose",
    category: "romance",
    price: 17.99,
    rentPrice: 2.99,
    rating: 4.9,
    reviewCount: 412,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/book-slice-of-life-SimMrnn5ca8s4HTpAmsGg4.webp",
    description: "A modern romance about two souls finding each other in the chaos of urban life. Swoon-worthy and heartfelt.",
    pages: 304,
    publishedYear: 2024,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 7 },
    reviews: [
      { id: "r1", author: "Grace M.", rating: 5, text: "The chemistry between characters is perfect!", date: "2024-04-12" },
      { id: "r2", author: "Rachel T.", rating: 5, text: "Absolutely beautiful love story.", date: "2024-03-28" },
    ],
  },
  {
    id: "7",
    title: "The Mystery of Blackwood Manor",
    author: "Christopher Lane",
    category: "mystery",
    price: 20.99,
    rentPrice: 3.99,
    rating: 4.6,
    reviewCount: 234,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/book-horror-TJpmwU3tdj5JfbfP6hYBaV.webp",
    description: "A classic mystery novel with intricate plot twists and unforgettable characters. Perfect for detective story lovers.",
    pages: 376,
    publishedYear: 2023,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 5 },
    reviews: [
      { id: "r1", author: "Henry W.", rating: 5, text: "Brilliant mystery with clever clues throughout.", date: "2024-03-15" },
      { id: "r2", author: "Eleanor F.", rating: 4, text: "Engaging and well-plotted.", date: "2024-02-20" },
    ],
  },
  {
    id: "8",
    title: "The Dragon's Crown",
    author: "Sylvia Winters",
    category: "fantasy",
    price: 23.99,
    rentPrice: 4.49,
    rating: 4.7,
    reviewCount: 356,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/featured-book-psychology-Wj7LTfUmRoDmkh9dgjxnoe.webp",
    description: "An epic fantasy adventure with magic, dragons, and a hero's journey. Immersive world-building at its finest.",
    pages: 512,
    publishedYear: 2024,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 6 },
    reviews: [
      { id: "r1", author: "Brandon K.", rating: 5, text: "Epic fantasy done right! Can't wait for the sequel.", date: "2024-04-01" },
      { id: "r2", author: "Lily J.", rating: 5, text: "Absolutely immersive world. Loved every page.", date: "2024-03-12" },
    ],
  },
  {
    id: "9",
    title: "Mindfulness in Motion",
    author: "Dr. James Wilson",
    category: "psychology",
    price: 18.99,
    rentPrice: 3.49,
    rating: 4.5,
    reviewCount: 178,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/featured-book-thriller-bkEMyz2Tw4sNGop7s25wBB.webp",
    description: "Practical guide to integrating mindfulness into daily life. Backed by neuroscience and accessible to all.",
    pages: 272,
    publishedYear: 2023,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 4 },
    reviews: [
      { id: "r1", author: "Patricia S.", rating: 5, text: "Transformative practices that actually work.", date: "2024-03-20" },
      { id: "r2", author: "Michael D.", rating: 4, text: "Good practical advice for busy people.", date: "2024-02-15" },
    ],
  },
  {
    id: "10",
    title: "The Last Whisper",
    author: "Natalie Cross",
    category: "thriller",
    price: 21.99,
    rentPrice: 4.49,
    rating: 4.8,
    reviewCount: 445,
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663612112166/R7dFPjGDJjdBVdfCutd7Pt/book-slice-of-life-SimMrnn5ca8s4HTpAmsGg4.webp",
    description: "A page-turner about a detective racing against time to solve a cold case. Intense and unpredictable.",
    pages: 400,
    publishedYear: 2024,
    availability: { purchase: true, rentNearby: true, nearbyLibraries: 9 },
    reviews: [
      { id: "r1", author: "Frank L.", rating: 5, text: "Best thriller I've read this year!", date: "2024-04-09" },
      { id: "r2", author: "Carol M.", rating: 5, text: "Couldn't stop reading. Absolutely gripping.", date: "2024-03-25" },
    ],
  },
];
