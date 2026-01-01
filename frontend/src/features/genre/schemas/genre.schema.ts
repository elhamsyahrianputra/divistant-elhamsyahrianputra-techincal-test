import z from "zod";

export const genreSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});

export type GenreRequest = z.infer<typeof genreSchema>;
