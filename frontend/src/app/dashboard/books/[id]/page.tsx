"use client";

import { Star, TrashBinTrash } from "@solar-icons/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/button";
import { useAuthors } from "@/features/author/hooks/use-author";
import { BookFormFields, CoverUpload } from "@/features/book/components";
import {
  useBook,
  useDeleteBook,
  useUpdateBook,
} from "@/features/book/hooks/use-book";
import type { BookRequest } from "@/features/book/schemas/book.schema";
import { useGenres } from "@/features/genre/hooks/use-genre";
import { useReviewAverage } from "@/features/review/hooks/use-review";

export default function Page() {
  const params = useParams();
  const bookId = params.id as string;

  const { data: book } = useBook(bookId);
  const { data: authors } = useAuthors({
    limit: 100
  });
  const { data: genres } = useGenres();
  const { data: reviews } = useReviewAverage(bookId);

  const { mutate: updateBookMutate } = useUpdateBook(bookId);
  const { mutate: deleteBookMutate } = useDeleteBook(bookId);

  const handleUpdate = async (request: BookRequest) => {
    toast.loading("Updating book...", { id: "update-book" });
    updateBookMutate(request);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBookMutate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Side - Cover Image */}
        <div className="w-full lg:w-3/12">
          <div className="sticky top-18">
            <CoverUpload
              bookId={bookId}
              coverPreview={book?.data.coverUrl || null}
            />
            {/* Rating & Reviews */}
            <div className="mt-6 flex items-center gap-1">
              <div className="flex items-center gap-x-1 rounded-xl bg-warning-lighter px-2 py-0.5">
                <Star className="text-warning" size={14} weight="BoldDuotone" />
                <span className="font-semibold text-sm">
                  {reviews?.data.average.toFixed(1)}
                </span>
              </div>
              <span className="ml-1 text-gray-400 text-xs">
                ({reviews?.data.totalReviews} reviews)
              </span>
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-error-dark"
                onClick={handleDelete}
                type="button"
              >
                <TrashBinTrash size={18} weight="BoldDuotone" />
                Delete Book
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-9/12">
          <BookFormFields
            authors={authors?.data}
            book={book?.data}
            genres={genres?.data}
            onSubmit={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}
