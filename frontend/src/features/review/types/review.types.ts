import type { User } from "@/features/auth/types/auth.types";
import type { Book } from "@/features/book/types/book.types";

export interface Review {
  id: string;
  userId: string;
  user: User;
  bookId: string;
  book: Book;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
