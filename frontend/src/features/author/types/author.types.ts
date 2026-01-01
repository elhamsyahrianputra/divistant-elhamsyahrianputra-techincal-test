import type { Book } from "@/features/book/types/book.types";

export interface Author {
  id: string;
  slug: string;
  name: string;
  birthPlace?: string;
  birthDate?: Date;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  books: Book[];
}
