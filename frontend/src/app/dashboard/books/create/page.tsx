"use client";

import { toast } from "sonner";
import { useAuthors } from "@/features/author/hooks/use-author";
import { BookFormFields } from "@/features/book/components";
import { useCreateBook } from "@/features/book/hooks/use-book";
import type { BookRequest } from "@/features/book/schemas/book.schema";
import { useGenres } from "@/features/genre/hooks/use-genre";

export default function Page() {
  const { data: authors } = useAuthors();
  const { data: genres } = useGenres();
  const { mutate: createBook } = useCreateBook();

  const handleCreate = async (request: BookRequest) => {
    toast.loading("Creating book...", { id: "create-book" });
    createBook(request);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Side - Cover Placeholder */}
        <div className="w-full lg:w-3/12">
          <div className="sticky top-20">
            <span className="mb-2 block font-semibold text-gray-800 text-xs">
              Cover Image
            </span>
            <div className="group relative aspect-2/3 overflow-hidden rounded-lg border-2 border-gray-300 border-dashed bg-linear-to-br from-10% from-primary-lighter to-30% to-gray-100 transition-colors">
              <div className="flex h-full flex-col items-center justify-center gap-y-3 px-4 text-center">
                <span className="px-4 text-center font-bold text-gray-600 text-xl leading-tight">
                  Save the book first to upload the cover.
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-500 text-xs">
              Recommended: 400x600px (2:3 ratio)
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-9/12">
          <BookFormFields
            authors={authors?.data}
            book={undefined}
            genres={genres?.data}
            onSubmit={handleCreate}
          />
        </div>
      </div>
    </div>
  );
}
