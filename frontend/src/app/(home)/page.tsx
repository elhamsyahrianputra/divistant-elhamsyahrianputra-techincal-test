"use client";

import { Footer } from "@/core/components/layouts/footer/footer";
import { useAuthors } from "@/features/author/hooks/use-author";
import { useBooks } from "@/features/book/hooks/use-book";
import { useGenres } from "@/features/genre/hooks/use-genre";
import {
  CommunityStatsSection,
  FeaturedBooksSection,
  HeroSection,
  PopularAuthorsSection,
  TopGenresSection,
} from "./_sections";

export default function HomePage() {
  // Fetch featured books (first page with limit 6)
  const { data: booksResponse, isLoading: booksLoading } = useBooks({
    page: 1,
    limit: 6,
    sortBy: "updatedAt",
    sortOrder: "desc",
    includes: "authors,reviews",
  });

  // Fetch genres (first page with limit 6)
  const { data: genresResponse, isLoading: genresLoading } = useGenres({
    page: 1,
    limit: 6,
  });

  // Fetch authors (first page with limit 8)
  const { data: authorsResponse, isLoading: authorsLoading } = useAuthors({
    page: 1,
    limit: 8,
  });

  const books = booksResponse?.data || [];
  const genres = genresResponse?.data || [];
  const authors = authorsResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen">
        <HeroSection books={books} />

        <TopGenresSection genres={genres} isLoading={genresLoading} />

        <FeaturedBooksSection books={books} isLoading={booksLoading} />

        <PopularAuthorsSection authors={authors} isLoading={authorsLoading} />

        <CommunityStatsSection
          totalAuthors={authorsResponse?.meta?.total_items || 0}
          totalBooks={booksResponse?.meta?.total_items || 0}
          totalGenres={genresResponse?.meta?.total_items || 0}
        />
      </main>

      <Footer />
    </div>
  );
}
