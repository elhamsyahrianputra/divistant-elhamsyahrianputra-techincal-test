"use client";

import { TrashBinTrash } from "@solar-icons/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/button";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import dayjs from "@/core/lib/dayjs";
import { GenreFormFields } from "@/features/genre/components";
import {
  useDeleteGenre,
  useGenre,
  useGenreBooks,
  useUpdateGenre,
} from "@/features/genre/hooks/use-genre";
import type { GenreRequest } from "@/features/genre/schemas/genre.schema";
import { Card } from "@/core/components/ui/card";

export default function Page() {
  const params = useParams();
  const genreId = params.id as string;
  const [bookPage, setBookPage] = useState(1);
  const [bookLimit] = useState(5);

  const { data: genre } = useGenre(genreId);
  const { data: booksResponse } = useGenreBooks(genreId, {
    page: bookPage,
    limit: bookLimit,
  });
  const { mutate: updateGenre } = useUpdateGenre(genreId);
  const { mutate: deleteGenre } = useDeleteGenre(genreId);

  const handleUpdate = (request: GenreRequest) => {
    toast.loading("Updating genre...", { id: "update-genre" });
    updateGenre(request);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this genre?")) {
      deleteGenre();
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left/Main Column */}
        <div className="space-y-8 md:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <GenreFormFields genre={genre?.data} onSubmit={handleUpdate} />
          </div>

          {booksResponse?.data && booksResponse.data.length > 0 && (
            <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                Books in this Genre
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {booksResponse.data.map((book) => (
                  <div key={book.id}>
                    <Card className="h-full overflow-hidden">
                      <a
                        href={`/books/${book.slug}`}
                        tabIndex={-1}
                        className="block"
                      >
                        <div className="relative aspect-2/3 bg-linear-to-br from-primary-lighter to-gray-100">
                          {book.coverUrl ? (
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                              No Cover
                            </div>
                          )}
                        </div>
                      </a>
                      <div className="flex flex-col p-4">
                        <a
                          href={`/books/${book.slug}`}
                          className="mb-2 line-clamp-2 font-semibold text-gray-900 text-sm hover:underline transition"
                        >
                          {book.title}
                        </a>
                        <p className="mb-1 text-gray-600 text-xs">
                          {book.publisher || "Unknown Publisher"}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {dayjs(book.publishedAt).format("YYYY")}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              {booksResponse.meta && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    meta={booksResponse.meta}
                    onPageChange={setBookPage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {/* Right/Meta Column */}
        <div className="space-y-6">
          {/* Title, Slug, Delete Button */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="mb-1 line-clamp-2 font-bold text-2xl text-gray-900">
                {genre?.data.name ?? "Genre"}
              </h1>
              <span className="line-clamp-2 text-gray-400 text-xs">
                Slug: {genre?.data.slug}
              </span>
            </div>
            <Button
              className="bg-error-dark"
              onClick={handleDelete}
              type="button"
              variant="dark"
            >
              <TrashBinTrash size={18} weight="BoldDuotone" />
              Delete
            </Button>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 text-gray-700 text-sm shadow">
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-xs uppercase tracking-wide">
                Meta
              </span>
              <div className="flex items-center justify-between">
                <span>Books</span>
                <span className="font-semibold text-lg text-primary">
                  {booksResponse?.meta?.total_items ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Created</span>
                <span className="font-semibold">
                  {genre?.data.createdAt
                    ? dayjs(genre.data.createdAt).format("DD MMM YYYY")
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated</span>
                <span className="font-semibold">
                  {genre?.data.updatedAt
                    ? dayjs(genre.data.updatedAt).format("DD MMM YYYY")
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
