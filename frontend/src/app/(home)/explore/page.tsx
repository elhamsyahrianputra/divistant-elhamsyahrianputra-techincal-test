"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "@/core/components/ui/forms";
import { useGenres } from "@/features/genre/hooks/use-genre";

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { data: genresResponse, isLoading } = useGenres({
    limit: 20,
  });

  const genres = genresResponse?.data || [];

  const handleGenreClick = (genre: string) => {
    if (genre !== "All") {
      // Navigate to search page with genre filter
      window.location.href = `/search?genre=${genre.toLowerCase().replace(" ", "-")}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex min-h-screen items-center py-6">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-3 font-bold text-4xl text-gray-900 md:text-5xl">
              Search Your Favorite Book
            </h1>
            <p className="text-gray-600 text-lg">
              Explore millions of books, discover new genres, and find your next
              great read
            </p>
          </div>

          <div className="space-y-10">
            {/* Search Input */}
            <div className="mx-auto max-w-3xl">
              <Search />
            </div>

            {/* Popular Categories */}
            <div className="mx-auto max-w-5xl">
              <h3 className="mb-6 font-semibold text-base text-gray-900">
                Popular Categories
              </h3>
              {isLoading ? (
                <div className="py-8 text-center text-gray-500">
                  Loading genres...
                </div>
              ) : genres.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-4">
                  {genres.map((genre) => (
                    <Link href={`/search?genre=${genre.slug}`} key={genre.id}>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:border-primary hover:bg-primary-lighter/20">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {genre.name}
                          </h4>
                          <p className="mt-1 text-gray-500 text-xs">
                            {genre.description
                              ? genre.description.substring(0, 30)
                              : "Genre"}
                          </p>
                        </div>
                        <div className="text-primary text-xl">→</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No genres available
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="rounded-lg bg-primary-lighter/30 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">
                Finding Your Next Read
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">•</span>
                  Use the search bar above to find books by title or author
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">•</span>
                  Browse by categories to discover genres you love
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">•</span>
                  Check out top-rated books to find community favorites
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
