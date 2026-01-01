"use client";

import { AddCircle } from "@solar-icons/react";
import Link from "next/link";
import { buttonVariants } from "@/core/components/ui/button";
import { Search } from "@/core/components/ui/forms";
import { GenreStrip } from "@/features/genre/components";
import { useGenres } from "@/features/genre/hooks/use-genre";

export default function Page() {
  const { data: genres } = useGenres();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-8/12">
          <Search />
        </div>

        <Link
          className={buttonVariants({ variant: "dark", size: "md" })}
          href="/dashboard/genres/create"
        >
          <AddCircle size={24} weight="BoldDuotone" />
          <span>Add Genre</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {genres?.data.map((genre) => (
          <GenreStrip genre={genre} key={genre.id} />
        ))}
      </div>
    </div>
  );
}
