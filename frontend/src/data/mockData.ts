export interface Author {
  id: string;
  name: string;
  bio: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: Author;
  genres: Genre[];
  cover: string;
  description: string;
  pages: number;
  publisher: string;
  publishedYear: number;
  isbn: string;
  averageRating: number;
  totalReviews: number;
}

export const genres: Genre[] = [
  { id: "1", name: "All Books", slug: "all" },
  { id: "2", name: "Fiction", slug: "fiction" },
  { id: "3", name: "Non-Fiction", slug: "non-fiction" },
  { id: "4", name: "Mystery", slug: "mystery" },
  { id: "5", name: "Romance", slug: "romance" },
  { id: "6", name: "Sci-Fi", slug: "sci-fi" },
  { id: "7", name: "Fantasy", slug: "fantasy" },
  { id: "8", name: "Thriller", slug: "thriller" },
];

export const authors: Author[] = [
  {
    id: "1",
    name: "Elena Marchetti",
    bio: "Award-winning author of contemporary fiction.",
  },
  {
    id: "2",
    name: "James Thornwood",
    bio: "Master of psychological thrillers and mystery.",
  },
  { id: "3", name: "Sarah Chen", bio: "Bestselling romance and drama writer." },
  {
    id: "4",
    name: "Michael Rivera",
    bio: "Science fiction visionary and futurist.",
  },
  {
    id: "5",
    name: "Amara Okonkwo",
    bio: "Literary fiction author exploring human connections.",
  },
  { id: "6", name: "David Kim", bio: "Fantasy world-builder and storyteller." },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Silent Garden",
    author: authors[0],
    genres: [genres[1], genres[4]],
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description:
      "A haunting tale of love and loss set in a secluded Italian villa, where secrets bloom like the mysterious flowers in the garden.",
    pages: 342,
    publisher: "Evergreen Press",
    publishedYear: 2023,
    isbn: "978-0-123456-78-9",
    averageRating: 4.5,
    totalReviews: 128,
  },
  {
    id: "2",
    title: "Midnight Cipher",
    author: authors[1],
    genres: [genres[3], genres[7]],
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    description:
      "A detective races against time to decode a centuries-old cipher before a killer strikes again in modern London.",
    pages: 418,
    publisher: "Shadow House",
    publishedYear: 2024,
    isbn: "978-0-234567-89-0",
    averageRating: 4.7,
    totalReviews: 256,
  },
  {
    id: "3",
    title: "Echoes of Tomorrow",
    author: authors[3],
    genres: [genres[5]],
    cover:
      "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=400&h=600&fit=crop",
    description:
      "In a world where memories can be traded, one woman discovers a memory that could change the future of humanity.",
    pages: 384,
    publisher: "Nova Horizons",
    publishedYear: 2024,
    isbn: "978-0-345678-90-1",
    averageRating: 4.3,
    totalReviews: 189,
  },
  {
    id: "4",
    title: "The Last Symphony",
    author: authors[4],
    genres: [genres[1]],
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    description:
      "A celebrated pianist confronts her past when she returns to Vienna for one final performance.",
    pages: 298,
    publisher: "Harmony Books",
    publishedYear: 2023,
    isbn: "978-0-456789-01-2",
    averageRating: 4.8,
    totalReviews: 312,
  },
  {
    id: "5",
    title: "Dragons of the North",
    author: authors[5],
    genres: [genres[6]],
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description:
      "An epic fantasy saga where a young dragon rider must unite warring kingdoms before an ancient evil awakens.",
    pages: 524,
    publisher: "Realm Fiction",
    publishedYear: 2024,
    isbn: "978-0-567890-12-3",
    averageRating: 4.6,
    totalReviews: 445,
  },
  {
    id: "6",
    title: "Whispers in Paris",
    author: authors[2],
    genres: [genres[4]],
    cover:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    description:
      "Two strangers meet in a Parisian bookshop and discover that love can bloom in the most unexpected places.",
    pages: 276,
    publisher: "Romance House",
    publishedYear: 2023,
    isbn: "978-0-678901-23-4",
    averageRating: 4.4,
    totalReviews: 203,
  },
  {
    id: "7",
    title: "The Glass Tower",
    author: authors[1],
    genres: [genres[3], genres[7]],
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    description:
      "A corporate espionage thriller set in the gleaming towers of Manhattan, where trust is the most dangerous currency.",
    pages: 396,
    publisher: "Shadow House",
    publishedYear: 2024,
    isbn: "978-0-789012-34-5",
    averageRating: 4.2,
    totalReviews: 167,
  },
  {
    id: "8",
    title: "Beyond the Stars",
    author: authors[3],
    genres: [genres[5], genres[6]],
    cover:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    description:
      "Humanity's first interstellar colony faces an impossible choice when they encounter an ancient alien civilization.",
    pages: 462,
    publisher: "Nova Horizons",
    publishedYear: 2024,
    isbn: "978-0-890123-45-6",
    averageRating: 4.9,
    totalReviews: 521,
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    bookId: "1",
    userId: "u1",
    userName: "BookLover42",
    rating: 5,
    comment:
      "Absolutely captivating! The prose is beautiful and the story stayed with me long after I finished reading.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    bookId: "1",
    userId: "u2",
    userName: "LiteraryExplorer",
    rating: 4,
    comment:
      "A beautifully written novel with rich characters. The pacing was slightly slow in the middle, but the ending made it worthwhile.",
    createdAt: "2024-01-10T14:20:00Z",
  },
  {
    id: "3",
    bookId: "2",
    userId: "u3",
    userName: "MysteryFan",
    rating: 5,
    comment:
      "Edge-of-your-seat thriller! Could not put it down. The cipher puzzles were brilliantly crafted.",
    createdAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "4",
    bookId: "2",
    userId: "u4",
    userName: "NightOwlReader",
    rating: 4,
    comment:
      "Great atmospheric writing and compelling plot. Some twists were predictable but still enjoyable.",
    createdAt: "2024-01-28T22:45:00Z",
  },
  {
    id: "5",
    bookId: "3",
    userId: "u5",
    userName: "SciFiDreamer",
    rating: 5,
    comment:
      "Innovative concept executed flawlessly. The world-building is phenomenal and the emotional depth is unexpected.",
    createdAt: "2024-02-05T16:00:00Z",
  },
];

export const getBookById = (id: string): Book | undefined => {
  return books.find((book) => book.id === id);
};

export const getReviewsByBookId = (bookId: string): Review[] => {
  return reviews.filter((review) => review.bookId === bookId);
};

export const getBooksByGenre = (genreSlug: string): Book[] => {
  if (genreSlug === "all") return books;
  return books.filter((book) =>
    book.genres.some((genre) => genre.slug === genreSlug),
  );
};
