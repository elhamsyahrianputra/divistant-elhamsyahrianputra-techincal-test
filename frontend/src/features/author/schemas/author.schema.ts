import z from "zod";

export const authorSchema = z.object({
  name: z.string().nonempty("Name is required"),
  birthPlace: z.string().optional(),
  birthDate: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), {
      message: "Invalid date format",
    }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type AuthorRequest = z.infer<typeof authorSchema>;
