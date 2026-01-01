"use client";

import { AddCircle } from "@solar-icons/react";
import Link from "next/link";
import { buttonVariants } from "@/core/components/ui/button";
import { Search } from "@/core/components/ui/forms";
import { BookCard } from "@/features/book/components";
import { useBooks } from "@/features/book/hooks/use-book";

export default function Page() {
  const { data: books } = useBooks();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-8/12">
          <Search />
        </div>

        <Link
          className={buttonVariants({ variant: "dark", size: "md" })}
          href="/dashboard/books/create"
        >
          <AddCircle size={24} weight="BoldDuotone" />
          <span>Add Book</span>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books?.data.map((book) => (
          <BookCard book={book} key={book.slug} />
        ))}
      </div>
    </div>
  );
}
