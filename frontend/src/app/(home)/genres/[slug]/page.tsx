"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/core/components/ui/card";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import {
  useGenreBooks,
  useGenreBySlug,
} from "@/features/genre/hooks/use-genre";

export default function GenreDetailPage() {
  const params = useParams();
  const genreSlug = params.slug as string;
  const [page, setPage] = useState(1);
  const [limit] = useState(24);

  // Fetch genre details
  const { data: genreResponse, isLoading: genreLoading } =
    useGenreBySlug(genreSlug);
  const genre = genreResponse?.data;

  // Fetch books in this genre with pagination
  const { data: booksResponse, isLoading: booksLoading } = useGenreBooks(
    genre?.id || "",
    {
      page,
      limit,
    },
  );

  const books = (booksResponse as any)?.data || [];

  // Color mapping for genre icons
  const colorMap: Record<string, string> = {
    fiction: "bg-blue-500",
    mystery: "bg-purple-500",
    romance: "bg-pink-500",
    "science-fiction": "bg-indigo-500",
    fantasy: "bg-teal-500",
    biography: "bg-amber-500",
    "self-help": "bg-green-500",
    history: "bg-orange-500",
  };

  const color =
    (genre?.slug && colorMap[genre.slug.toLowerCase()]) ||
    (genre?.name && colorMap[genre.name.toLowerCase()]) ||
    "bg-blue-500";

  if (genreLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Loading genre details...</div>
      </div>
    );
  }

  if (!genre) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Genre not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Genre Header */}
      <section className="bg-linear-to-br from-primary-light/10 via-primary-light/5 to-transparent py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
            {/* Genre Icon */}
            <div
              className={`h-24 w-24 shrink-0 ${color} flex items-center justify-center rounded-full font-bold text-5xl text-white shadow-xl`}
            >
              {genre.name.charAt(0)}
            </div>

            {/* Genre Info */}
            <div className="flex-1">
              <h1 className="mb-4 font-bold text-4xl text-gray-900 md:text-5xl">
                {genre.name}
              </h1>

              {genre.description && (
                <p className="max-w-3xl text-gray-700 text-lg leading-relaxed">
                  {genre.description}
                </p>
              )}

              <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary-light">
                    {(booksResponse as any)?.meta?.total_items || 0}
                  </div>
                  <div className="text-gray-600 text-sm">Books Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books in Genre */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">
          Books in {genre.name}
        </h2>

        {booksLoading ? (
          <div className="py-12 text-center text-gray-500">
            Loading books...
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {books.map((book: any) => (
                <Link href={`/books/${book.slug}`} key={book.id}>
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-2/3 bg-linear-to-br from-primary-lighter to-gray-100">
                      <Image
                        alt={book.title}
                        className="object-cover transition-transform group-hover:scale-105"
                        fill
                        src={
                          book.coverUrl ||
                          "https://via.placeholder.com/400x600?text=No+Cover"
                        }
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 text-sm">
                        {book.title}
                      </h3>
                      {book.authors && book.authors.length > 0 && (
                        <p className="text-gray-600 text-xs">
                          {book.authors.map((a: any) => a.name).join(", ")}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {(booksResponse as any)?.meta && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  meta={(booksResponse as any).meta}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No books found in this genre
          </div>
        )}
      </section>
    </div>
  );
}
