"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/core/components/ui/card";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import dayjs from "@/core/lib/dayjs";
import { useAuthor, useAuthorBooks } from "@/features/author/hooks/use-author";

export default function AuthorDetailPage() {
  const params = useParams();
  const authorSlug = params.slug as string;
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  // Fetch author details
  const { data: authorResponse, isLoading: authorLoading } =
    useAuthor(authorSlug);
  const author = authorResponse?.data;

  // Fetch author's books with pagination
  const { data: booksResponse, isLoading: booksLoading } = useAuthorBooks(
    author?.id || "",
    {
      page,
      limit,
    },
  );

  const books = (booksResponse as any)?.data || [];

  if (authorLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Loading author details...</div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Author not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Author Header */}
      <section className="bg-linear-to-br from-primary-light/10 via-primary-light/5 to-transparent py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* Author Image */}
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full shadow-xl">
              {author.imageUrl ? (
                <Image
                  alt={author.name}
                  className="object-cover"
                  fill
                  priority
                  src={author.imageUrl}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary-light">
                  <span className="font-bold text-6xl text-white">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="mb-4 font-bold text-4xl text-gray-900 md:text-5xl">
                {author.name}
              </h1>

              {(author.birthPlace || author.birthDate) && (
                <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-gray-600 md:justify-start">
                  {author.birthDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Born:</span>
                      <span className="font-semibold">
                        {dayjs(author.birthDate).format("MMMM DD, YYYY")}
                      </span>
                    </div>
                  )}
                  {author.birthPlace && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">•</span>
                      <span className="font-semibold">{author.birthPlace}</span>
                    </div>
                  )}
                </div>
              )}

              {author.description && (
                <p className="max-w-3xl text-gray-700 text-lg leading-relaxed">
                  {author.description}
                </p>
              )}

              <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary-light">
                    {(booksResponse as any)?.meta?.total_items || 0}
                  </div>
                  <div className="text-gray-600 text-sm">Books Published</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books by Author */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 font-bold text-2xl text-gray-900">
          Books by {author.name}
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
                      {book.publishedAt && (
                        <p className="text-gray-500 text-xs">
                          {dayjs(book.publishedAt).format("YYYY")}
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
            No books found for this author
          </div>
        )}
      </section>
    </div>
  );
}
