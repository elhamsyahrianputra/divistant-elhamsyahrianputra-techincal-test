"use client";

import { ArrowRight, BookBookmark } from "@solar-icons/react";
import Link from "next/link";
import { Badge } from "@/core/components/ui/badge";
import { Card } from "@/core/components/ui/card";
import type { Genre } from "../types/genre.types";

interface GenreStripProps {
  genre: Genre;
}

export function GenreStrip({ genre }: GenreStripProps) {
  const bookCount = genre.books?.length ?? 0;

  return (
    <Link href={`/dashboard/genres/${genre.id}`}>
      <Card className="group hover:-translate-y-1 flex items-center justify-between gap-4 border border-transparent bg-linear-to-r from-primary-lighter/80 via-white to-white px-4 py-3 transition hover:border-primary/40 hover:shadow-xl">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge
              className="uppercase tracking-wide"
              color="primary"
              variant="solid"
            >
              {genre.slug}
            </Badge>
          </div>
          {genre.description && (
            <p className="line-clamp-2 text-gray-600 text-sm">
              {genre.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <BookBookmark size={16} weight="BoldDuotone" />
            <span>
              {bookCount} book{bookCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-lighter text-primary transition group-hover:translate-x-1">
          <ArrowRight size={22} weight="BoldDuotone" />
        </div>
      </Card>
    </Link>
  );
}
