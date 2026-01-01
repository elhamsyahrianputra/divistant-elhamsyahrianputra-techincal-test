"use client";

import { Star } from "@solar-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/core/components/ui/card";
import { Search } from "@/core/components/ui/forms";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import type { QueryParams } from "@/core/types/pagination.types";
import { useBooks } from "@/features/book/hooks/use-book";
import { useGenres } from "@/features/genre/hooks/use-genre";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "All",
  );
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch genres for filter dropdown
  const { data: genresResponse, isLoading: genresLoading } = useGenres({
    limit: 50,
  });

  // Build query params for books fetch
  const queryParams: QueryParams = {
    page,
    limit,
    search: searchQuery || undefined,
    sortBy,
    sortOrder: sortOrder as "asc" | "desc",
  };

  // Fetch books with filters
  const { data: booksResponse, isLoading: booksLoading } =
    useBooks(queryParams);

  const books = booksResponse?.data || [];
  const genres = genresResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="sticky top-14 z-40 border-gray-100 border-b bg-white py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6">
            <h1 className="mb-2 font-bold text-3xl text-gray-900">
              Search Books
            </h1>
            <p className="text-gray-600 text-sm">
              Find the perfect book with our search and filters
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <Search />
            </div>
            <select
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-primary focus:outline-none"
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setPage(1);
              }}
              value={selectedGenre}
            >
              <option value="All">All Genres</option>
              {genresLoading ? (
                <option disabled>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
            <select
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-primary focus:outline-none"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "rating") {
                  setSortBy("rating");
                  setSortOrder("desc");
                } else if (value === "newest") {
                  setSortBy("createdAt");
                  setSortOrder("desc");
                } else if (value === "title") {
                  setSortBy("title");
                  setSortOrder("asc");
                } else {
                  setSortBy("updatedAt");
                  setSortOrder("desc");
                }
                setPage(1);
              }}
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {books.length} of {booksResponse?.meta?.total_items || 0}
            </span>{" "}
            books
            {selectedGenre !== "All" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-primary">
                  {genres.find((g) => g.id === selectedGenre)?.name ||
                    selectedGenre}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Books Grid */}
        {booksLoading ? (
          <div className="py-12 text-center text-gray-500">
            Loading books...
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {books.map((book) => (
                <Link href={`/books/${book.slug}`} key={book.id}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-2/3 bg-linear-to-br from-primary-lighter to-gray-100">
                      <Image
                        alt={book.title}
                        className="object-cover transition-transform hover:scale-105"
                        fill
                        src={
                          book.coverUrl || "https://via.placeholder.com/400x600"
                        }
                      />
                    </div>
                    <div className="flex h-full flex-col p-4">
                      <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 text-sm">
                        {book.title}
                      </h3>
                      <p className="mb-3 flex-1 text-gray-600 text-xs">
                        {book.authors?.length > 0
                          ? book.authors.map((a) => a.name).join(", ")
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

            {/* Pagination */}
            {booksResponse?.meta && (
              <div className="mt-12 flex justify-center">
                <Pagination meta={booksResponse.meta} onPageChange={setPage} />
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No books found. Try a different search or filter.
          </div>
        )}
      </section>
    </div>
  );
}
