"use client";

import { Star } from "@solar-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card } from "@/core/components/ui/card";
import { IMAGE_PLACEHOLDERS } from "@/core/constants/images";
import type { Book } from "@/features/book/types/book.types";

interface FeaturedBooksSectionProps {
  books: Book[];
  isLoading: boolean;
}

export function FeaturedBooksSection({
  books,
  isLoading,
}: FeaturedBooksSectionProps) {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h2 className="font-bold text-2xl text-gray-900">
            Featured This Week
          </h2>
          <p className="mt-1 text-gray-600 text-sm">
            Trending books our community loves
          </p>
        </div>
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">
            Loading featured books...
          </div>
        ) : books.length > 0 ? (
          <Swiper
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-14!"
            modules={[Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            slidesPerView={1}
            spaceBetween={20}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <Link href={`/books/${book.slug}`}>
                  <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-2/3 rounded-r-xl bg-linear-to-br from-primary-lighter to-gray-100">
                      <Image
                        alt={book.title}
                        className="rounded-r-xl object-cover transition-transform"
                        fill
                        src={book.coverUrl || IMAGE_PLACEHOLDERS.BOOK_COVER}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="mb-1 line-clamp-2 min-h-10 font-semibold text-gray-900 text-sm">
                        {book.title}
                      </h3>
                      <p className="mb-2 flex-1 text-gray-600 text-xs">
                        {book.authors
                          .slice(0, 2)
                          .map((a) => a.name)
                          .join(", ")}
                        {book.authors.length > 2 &&
                          ` +${book.authors.length - 2}`}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-warning"
                          size={12}
                          weight="BoldDuotone"
                        />
                        <span className="font-semibold text-xs">
                          {(book.averageRating ?? 0).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No books available
          </div>
        )}
      </div>
    </section>
  );
}
