"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/core/components/ui/card";
import type { Author } from "@/features/author/types/author.types";

interface PopularAuthorsSectionProps {
  authors: Author[];
  isLoading: boolean;
}

export function PopularAuthorsSection({
  authors,
  isLoading,
}: PopularAuthorsSectionProps) {
  return (
    <section className="bg-linear-to-br from-primary-light/5 to-transparent py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-2xl text-gray-900">
              Popular Authors
            </h2>
            <p className="mt-1 text-gray-600 text-sm">
              Discover amazing writers and their works
            </p>
          </div>
          <Link
            className="font-semibold text-primary-light text-sm hover:underline"
            href="/search?type=authors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {isLoading ? (
            <div className="col-span-full py-8 text-center text-gray-500">
              Loading authors...
            </div>
          ) : authors.length > 0 ? (
            authors.map((author) => (
              <Link href={`/authors/${author.slug}`} key={author.id}>
                <Card className="flex flex-col items-center gap-3 p-4 text-center transition-all hover:shadow-md">
                  {author.imageUrl && (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        alt={author.name}
                        className="object-cover"
                        fill
                        src={author.imageUrl}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="line-clamp-2 min-h-10 font-semibold text-gray-900 text-sm">
                      {author.name}
                    </h3>
                    {author.birthPlace && (
                      <p className="mt-1 line-clamp-2 min-h-8 text-gray-500 text-xs">
                        {author.birthPlace}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              No authors available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
