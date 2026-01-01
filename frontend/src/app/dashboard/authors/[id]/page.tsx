"use client";

import { TrashBinTrash } from "@solar-icons/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/core/components/ui/button";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import dayjs from "@/core/lib/dayjs";
import {
  AuthorFormFields,
  AuthorImageUpload,
} from "@/features/author/components";
import {
  useAuthor,
  useAuthorBooks,
  useDeleteAuthor,
  useUpdateAuthor,
} from "@/features/author/hooks/use-author";
import type { AuthorRequest } from "@/features/author/schemas/author.schema";
import { Card } from "@/core/components/ui/card";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const authorId = params.id as string;
  const [bookPage, setBookPage] = useState(1);
  const [bookLimit] = useState(5);

  const { data: author } = useAuthor(authorId);
  const { data: booksResponse } = useAuthorBooks(authorId, {
    page: bookPage,
    limit: bookLimit,
  });
  const { mutate: updateAuthor } = useUpdateAuthor(authorId);
  const { mutate: deleteAuthor } = useDeleteAuthor(authorId);

  const handleUpdate = (request: AuthorRequest) => {
    toast.loading("Updating author...", { id: "update-author" });
    updateAuthor(request);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this author?")) {
      deleteAuthor();
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left/Main Column */}
        <div className="space-y-8 md:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <AuthorFormFields author={author?.data} onSubmit={handleUpdate} />
          </div>

          {booksResponse?.data && booksResponse.data.length > 0 && (
            <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="mb-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                Books by this Author
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {booksResponse.data.map((book) => (
                  <div key={book.id}>
                    <Card className="h-full overflow-hidden">
                      <Link href={`/dashboard/books/${book.id}`} tabIndex={-1} className="block">
                        <div className="relative aspect-2/3 bg-linear-to-br from-primary-lighter to-gray-100">
                          {book.coverUrl ? (
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                              No Cover
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="flex flex-col p-4">
                        <Link href={`/dashboard/books/${book.id}`} className="mb-2 line-clamp-2 font-semibold text-gray-900 text-sm hover:underline transition">
                          {book.title}
                        </Link>
                        <p className="mb-1 text-gray-600 text-xs">
                          {book.publisher || "Unknown Publisher"}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {dayjs(book.publishedAt).format("YYYY")}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              {booksResponse.meta && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    meta={booksResponse.meta}
                    onPageChange={setBookPage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {/* Right/Meta Column */}
        <div className="space-y-6">
          <div className="sticky top-18">
            <AuthorImageUpload
              authorId={authorId}
              imagePreview={author?.data.imageUrl || null}
            />

            <div className="mt-6">
              <Button
                className="w-full bg-error-dark"
                onClick={handleDelete}
                type="button"
              >
                <TrashBinTrash size={18} weight="BoldDuotone" />
                Delete Author
              </Button>
            </div>

            {/* Meta Info */}
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 text-gray-700 text-sm shadow">
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs uppercase tracking-wide">
                  Meta
                </span>
                <div className="flex items-center justify-between">
                  <span>Books</span>
                  <span className="font-semibold text-lg text-primary">
                    {booksResponse?.meta?.total_items ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Created</span>
                  <span className="font-semibold text-xs">
                    {author?.data.createdAt
                      ? dayjs(author.data.createdAt).format("DD MMM YYYY")
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Updated</span>
                  <span className="font-semibold text-xs">
                    {author?.data.updatedAt
                      ? dayjs(author.data.updatedAt).format("DD MMM YYYY")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
