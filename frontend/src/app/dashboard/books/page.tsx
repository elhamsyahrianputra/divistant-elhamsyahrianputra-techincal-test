"use client";

import { AddCircle } from "@solar-icons/react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/core/components/ui/button";
import { Search } from "@/core/components/ui/forms";
import { Pagination } from "@/core/components/ui/pagination";
import { BookCard } from "@/features/book/components";
import { useBooks } from "@/features/book/hooks/use-book";

export default function Page() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: books } = useBooks({
    search: search || undefined,
    page,
    limit: 12,
    includes: "authors,genres",
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-8/12">
          <Search onSearch={handleSearch} placeholder="Search books..." />
        </div>

        <Link
          className={buttonVariants({ variant: "dark", size: "md" })}
          href="/dashboard/books/create"
        >
          <AddCircle size={24} weight="BoldDuotone" />
          <span>Add Book</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books?.data?.map((book) => (
          <BookCard book={book} key={book.slug} />
        ))}
      </div>

      {books?.meta && <Pagination meta={books.meta} onPageChange={setPage} />}
    </div>
  );
}
