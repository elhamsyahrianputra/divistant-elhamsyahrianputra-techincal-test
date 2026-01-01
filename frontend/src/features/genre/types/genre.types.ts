import type { Book } from "@/features/book/types/book.types";

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  books: Book[];
}
