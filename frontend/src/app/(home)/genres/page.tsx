"use client";

import { Star } from "@solar-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/core/components/ui/card";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import type { Author } from "@/features/author/types/author.types";
import { useGenreBooks, useGenres } from "@/features/genre/hooks/use-genre";

export default function GenresPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const { data: genresResponse, isLoading: genresLoading } = useGenres({
    page,
    limit,
  });

  const genres = genresResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 md:text-5xl">
            Explore Genres
          </h1>
          <p className="max-w-2xl text-gray-600 text-lg">
            Discover your next favorite book by browsing through our diverse
            collection of genres. Each category is carefully curated to help you
            find exactly what you're looking for.
          </p>
        </div>
      </section>

      {/* Genres Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        {genresLoading ? (
          <div className="py-12 text-center text-gray-500">
            Loading genres...
          </div>
        ) : genres.length > 0 ? (
          <div className="space-y-12">
            {genres.map((genre) => (
              <GenreCard genre={genre} key={genre.id} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No genres available
          </div>
        )}

        {/* Pagination */}
        {genresResponse?.meta && (
          <div className="mt-12 flex justify-center">
            <Pagination meta={genresResponse.meta} onPageChange={setPage} />
          </div>
        )}
      </section>
    </div>
  );
}

function GenreCard({ genre }: { genre: any }) {
  const { data: booksResponse, isLoading: booksLoading } = useGenreBooks(
    genre.id,
    {
      page: 1,
      limit: 6,
    },
  );

  const books = (booksResponse as any)?.data || [];
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
    colorMap[genre.slug?.toLowerCase()] ||
    colorMap[genre.name?.toLowerCase()] ||
    "bg-blue-500";

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`h-12 w-12 ${color} flex items-center justify-center rounded-full font-bold text-white text-xl shadow-lg`}
        >
          {genre.name[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-2xl text-gray-900">{genre.name}</h2>
              <p className="text-gray-600 text-sm">
                {(booksResponse as any)?.meta?.total_items || 0} books
              </p>
            </div>
            <Link
              className="font-semibold text-primary text-sm hover:underline"
              href={`/genres/${genre.slug}`}
            >
              View All →
            </Link>
          </div>
          {genre.description && (
            <p className="mt-2 text-gray-600">{genre.description}</p>
          )}
        </div>
      </div>

      {booksLoading ? (
        <div className="py-8 text-center text-gray-500">Loading books...</div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {books.map((book: any) => (
            <Link href={`/books/${book.slug}`} key={book.id}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-2/3 bg-linear-to-br from-primary-lighter to-gray-100">
                  <Image
                    alt={book.title}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                    src={book.coverUrl || "https://via.placeholder.com/400x600"}
                  />
                </div>
                <div className="p-3">
                  <h3 className="mb-1 line-clamp-2 font-semibold text-gray-900 text-sm">
                    {book.title}
                  </h3>
                  <p className="mb-2 line-clamp-1 text-gray-600 text-xs">
                    {book.authors?.length > 0
                      ? book.authors
                          .map((author: Author) => author.name)
                          .join(", ")
                      : "Unknown Author"}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-warning"
                      size={12}
                      weight="BoldDuotone"
                    />
                    <span className="font-semibold text-xs">N/A</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No books in this genre
        </div>
      )}
    </div>
  );
}
