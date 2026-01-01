"use client";

import Link from "next/link";
import { Card } from "@/core/components/ui/card";
import type { Genre } from "@/features/genre/types/genre.types";

interface TopGenresSectionProps {
  genres: Genre[];
  isLoading: boolean;
}

export function TopGenresSection({ genres, isLoading }: TopGenresSectionProps) {
  return (
    <section className="bg-linear-to-br from-primary-light/20 to-primary-light/5 py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-2xl text-gray-900">Top Genres</h2>
            <p className="mt-1 text-gray-600 text-sm">
              Find your next favorite read by category
            </p>
          </div>
          <Link
            className="font-semibold text-primary-light text-sm hover:underline"
            href="/genres"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {isLoading ? (
            <div className="col-span-full py-8 text-center text-gray-500">
              Loading genres...
            </div>
          ) : genres.length > 0 ? (
            genres.map((genre) => (
              <Link href={`/genres/${genre.slug}`} key={genre.id}>
                <Card className="border border-transparent p-4 text-center transition-all hover:border-primary-light hover:shadow-md">
                  <h3 className="mb-1 font-semibold text-gray-900 text-sm">
                    {genre.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {genre.description
                      ? genre.description.substring(0, 20)
                      : "Genre"}
                  </p>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              No genres available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
