"use client";

import { Star } from "@solar-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/core/components/ui/card";
import { useReviewAverage } from "@/features/review/hooks/use-review";
import type { Book } from "../types/book.types";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { data: reviews } = useReviewAverage(book.id);

  return (
    <Card className="flex flex-col">
      <Link
        className="relative block aspect-2/3 w-full overflow-hidden rounded-r-2xl"
        href={`/dashboard/books/${book.id}`}
      >
        {book.coverUrl ? (
          <Image
            alt={book.title}
            className="h-full w-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            src={book.coverUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-10% from-primary-lighter to-30% to-gray-100">
            <span className="text-center font-semibold text-2xl text-gray-600 leading-6">
              Cover <br /> Unavailable
            </span>
          </div>
        )}
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link
          className="line-clamp-2 min-h-12 font-semibold text-base leading-6 hover:underline"
          href={`/dashboard/books/${book.id}`}
        >
          {book.title}
        </Link>
        <span className="mt-1 text-gray-500 text-xs">
          {book.authors && book.authors.length > 0 && (
            <>
              {book.authors.slice(0, 2).map((author, index, arr) => (
                <span key={author.slug}>
                  <Link
                    className="hover:underline"
                    href={`/dashboard/authors/${author.id}`}
                  >
                    {author.name}
                  </Link>
                  {index < arr.length - 1 ? ", " : ""}
                </span>
              ))}
              {book.authors.length > 2 && (
                <span className="text-gray-500">
                  , +{book.authors.length - 2}
                </span>
              )}
            </>
          )}
        </span>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center gap-x-1 rounded-xl bg-warning-lighter px-2 py-0.5">
            <Star className="text-warning" size={14} weight="BoldDuotone" />
            <span className="font-semibold text-sm">
              {reviews?.data.average.toFixed(1) || "0"}
            </span>
          </div>
          <span className="ml-1 text-gray-400 text-xs">
            ({reviews?.data.totalReviews || 0} reviews)
          </span>
        </div>
        <div className="mt-3 flex flex-1 flex-wrap gap-1">
          {book.genres && book.genres.length > 0 && (
            <>
              {book.genres.slice(0, 2).map((genre) => (
                <span
                  className="h-fit rounded-lg bg-gray-100 px-2 py-0.5 text-xs"
                  key={genre.slug}
                >
                  {genre.name}
                </span>
              ))}
              {book.genres.length > 2 && (
                <span className="h-fit rounded-lg bg-gray-100 px-2 py-0.5 text-xs">
                  +{book.genres.length - 2}
                </span>
              )}
            </>
          )}
        </div>
        {/* <p className="mt-4 line-clamp-3 text-gray-600 text-xs">
          {book.description}
        </p>
        <div className="flex pt-4 text-left">
          <div>
            <span className="font-medium text-gray-700 text-xs">
              {dayjs(book.publishedAt).format("DD MMM YYYY")}
            </span>
            <span className="block text-gray-500 text-xs">
              by {book.publisher}
            </span>
          </div>
        </div> */}
      </div>
    </Card>
  );
}
