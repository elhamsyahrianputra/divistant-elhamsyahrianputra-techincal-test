"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/core/components/ui/card";
import dayjs from "@/core/lib/dayjs";
import type { Author } from "../types/author.types";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const bookCount = author.books?.length ?? 0;

  return (
    <Card className="flex flex-col">
      <Link
        className="relative block aspect-square w-full overflow-hidden rounded-2xl"
        href={`/dashboard/authors/${author.id}`}
      >
        {author.imageUrl ? (
          <Image
            alt={author.name}
            className="h-full w-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            src={author.imageUrl}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-10% from-primary-lighter to-30% to-gray-100">
            <span className="text-center font-semibold text-2xl text-gray-600 leading-6">
              Photo
              <br />
              Unavailable
            </span>
          </div>
        )}
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <Link
          className="line-clamp-2 font-semibold text-base leading-6 hover:underline"
          href={`/dashboard/authors/${author.id}`}
        >
          {author.name}
        </Link>

        {(author.birthPlace || author.birthDate) && (
          <div className="mt-1 flex flex-col text-gray-500 text-xs">
            {author.birthPlace && <span>{author.birthPlace}</span>}
            {author.birthDate && (
              <span>{dayjs(author.birthDate).format("DD MMM YYYY")}</span>
            )}
          </div>
        )}

        <div className="mt-auto text-gray-500 text-xs">
          {bookCount} book{bookCount === 1 ? "" : "s"}
        </div>
      </div>
    </Card>
  );
}
