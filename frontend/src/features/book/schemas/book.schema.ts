import z from "zod";

export const bookSchema = z.object({
  title: z.string().nonempty("Title is required").min(1, "Title is required"),
  isbn: z.string().optional(),
  pages: z
    .number()
    .optional()
    .or(z.nan().transform(() => undefined)),
  publisher: z.string().optional(),
  publishedAt: z.string().optional(),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
  authors: z.array(z.string()).min(1, "At least 1 author is required"),
  genres: z.array(z.string()).min(3, "At least 3 genre is required"),
});

export type BookRequest = z.infer<typeof bookSchema>;
