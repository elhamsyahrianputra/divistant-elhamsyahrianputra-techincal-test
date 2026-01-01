"use client";

import { ArrowRight } from "@solar-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import type { Book } from "@/features/book/types/book.types";

interface HeroSectionProps {
  books: Book[];
}

export function HeroSection({ books }: HeroSectionProps) {
  return (
    <section className="bg-linear-to-br from-primary-light/10 via-primary-light/5 to-transparent py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-4 font-bold text-4xl text-gray-900 leading-tight md:text-5xl">
              Discover Your Next
              <span className="block text-primary-light">Favorite Book</span>
            </h1>
            <p className="mb-8 text-gray-600 text-lg">
              Join millions of readers. Share reviews, track your reading, and
              explore personalized recommendations.
            </p>
            <div className="flex gap-4">
              <Link href="/search">
                <Button size="lg" variant="primary">
                  <span>Explore Books</span>
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/genres">
                <Button size="lg" variant="light">
                  Browse Genres
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden h-96 lg:block">
            {books.length > 0 && (
              <>
                <div className="absolute top-0 right-0 h-72 w-48 rotate-6 transform overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    alt={books[0]?.title || "Book cover"}
                    className="object-cover"
                    fill
                    src={
                      books[0]?.coverUrl ||
                      "https://via.placeholder.com/400x600"
                    }
                  />
                </div>
                {books.length > 1 && (
                  <div className="-rotate-6 absolute top-20 left-20 h-72 w-48 transform overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      alt={books[1]?.title || "Book cover"}
                      className="object-cover"
                      fill
                      src={
                        books[1]?.coverUrl ||
                        "https://via.placeholder.com/400x600"
                      }
                    />
                  </div>
                )}
                {books.length > 2 && (
                  <div className="absolute bottom-0 left-0 h-72 w-48 rotate-3 transform overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      alt={books[2]?.title || "Book cover"}
                      className="object-cover"
                      fill
                      src={
                        books[2]?.coverUrl ||
                        "https://via.placeholder.com/400x600"
                      }
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
