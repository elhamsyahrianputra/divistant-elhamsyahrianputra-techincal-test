import type { Author } from "@/features/author/types/author.types";
import type { Genre } from "@/features/genre/types/genre.types";
import type { Review } from "@/features/review/types/review.types";

export interface Book {
  id: string;
  slug: string;
  title: string;
  isbn: string;
  publisher: string;
  publishedAt: Date;
  coverUrl: string;
  pages: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  authors: Author[];
  genres: Genre[];
  reviews: Review[];
}
