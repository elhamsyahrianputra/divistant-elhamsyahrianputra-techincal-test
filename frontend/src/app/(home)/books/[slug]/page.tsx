"use client";

import { Star } from "@solar-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Pagination } from "@/core/components/ui/pagination/pagination";
import dayjs from "@/core/lib/dayjs";
import { tokenStorage } from "@/core/utils/token-storage";
import { useBookBySlug } from "@/features/book/hooks/use-book";
import {
  useReviewAverage,
  useReviewsByBook,
} from "@/features/review/hooks/use-review";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookSlug = params.slug as string;
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewLimit] = useState(5);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // Check if user is logged in and has member role
  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      try {
        // Decode JWT token manually (format: header.payload.signature)
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""),
        );
        const payload = JSON.parse(jsonPayload);

        setIsLoggedIn(true);
        setIsMember(payload.roles?.includes("member") || false);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        setIsMember(false);
      }
    }
  }, []);

  // Fetch book with authors and genres
  const { data: bookResponse, isLoading: bookLoading } =
    useBookBySlug(bookSlug);
  const book = bookResponse?.data;

  // Fetch average rating and total reviews
  const { data: reviewAvgResponse } = useReviewAverage(bookSlug);

  // Fetch reviews with pagination
  const { data: reviewsResponse } = useReviewsByBook(bookSlug, {
    includes: "user",
    page: reviewPage,
    limit: reviewLimit,
  });

  const reviews = reviewsResponse?.data || [];
  const averageRating = reviewAvgResponse?.data?.average || 0;
  const totalReviews = reviewAvgResponse?.data?.totalReviews || 0;

  if (bookLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Loading book details...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-gray-500">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Book Header */}
      <section className="border-b bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            {/* Book Cover */}
            <div>
              <div className="sticky top-8">
                <div className="relative mb-4 aspect-2/3 overflow-hidden rounded-lg shadow-xl">
                  {book.coverUrl ? (
                    <Image
                      alt={book.title}
                      className="object-cover"
                      fill
                      priority
                      src={
                        book.coverUrl ||
                        "https://via.placeholder.com/400x600?text=No+Cover"
                      }
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-10% from-primary-lighter to-30% to-gray-100">
                      <span className="text-center font-semibold text-2xl text-gray-600 leading-6">
                        Cover <br /> Unavailable
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div>
              <h1 className="mb-2 font-bold text-4xl text-gray-900">
                {book.title}
              </h1>
              {book.authors && book.authors.length > 0 && (
                <Link
                  className="mb-4 inline-block text-lg text-primary hover:underline"
                  href={`/authors/${book.authors[0].slug}`}
                >
                  by {book.authors.map((a) => a.name).join(", ")}
                </Link>
              )}

              {/* Rating Overview */}
              <div className="mb-6 flex items-center gap-4 border-b pb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-xl bg-warning-lighter px-3 py-2">
                    <Star
                      className="text-warning"
                      size={24}
                      weight="BoldDuotone"
                    />
                    <span className="font-bold text-2xl">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 text-sm">
                  <div className="font-semibold">
                    {totalReviews.toLocaleString()} ratings
                  </div>
                  <div>{reviewsResponse?.meta?.total_items || 0} reviews</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="mb-3 font-bold text-gray-900 text-xl">
                  About this book
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Book Details */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                {book.publisher && (
                  <div>
                    <span className="text-gray-500 text-sm">Publisher</span>
                    <p className="font-semibold text-gray-900">
                      {book.publisher}
                    </p>
                  </div>
                )}
                {book.publishedAt && (
                  <div>
                    <span className="text-gray-500 text-sm">Published</span>
                    <p className="font-semibold text-gray-900">
                      {dayjs(book.publishedAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                )}
                {book.pages && (
                  <div>
                    <span className="text-gray-500 text-sm">Pages</span>
                    <p className="font-semibold text-gray-900">{book.pages}</p>
                  </div>
                )}
                {book.isbn && (
                  <div>
                    <span className="text-gray-500 text-sm">ISBN</span>
                    <p className="font-semibold text-gray-900">{book.isbn}</p>
                  </div>
                )}
              </div>

              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.genres.map((genre) => (
                    <Link
                      className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 text-sm transition-colors hover:bg-gray-200"
                      href={`/search?genre=${genre.slug}`}
                      key={genre.id}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          {/* Rating Breakdown */}
          <div>
            <Card className="sticky top-8 p-6">
              <h2 className="mb-4 font-bold text-gray-900 text-xl">
                Rating Breakdown
              </h2>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const reviewsWithStar = reviews.filter(
                    (r) => r.rating === stars,
                  );
                  const count = reviewsWithStar.length;
                  const percentage =
                    totalReviews > 0
                      ? Math.round((count / totalReviews) * 100)
                      : 0;

                  return (
                    <div className="flex items-center gap-3" key={stars}>
                      <div className="flex w-16 items-center gap-1">
                        <span className="font-semibold text-sm">{stars}</span>
                        <Star
                          className="text-warning"
                          size={14}
                          weight="BoldDuotone"
                        />
                      </div>
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-warning"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-gray-600 text-sm">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="mb-3 font-semibold text-gray-900">
                  Rate & Review
                </h3>
                {!isLoggedIn || !isMember ? (
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="mb-3 text-gray-600 text-sm">
                      {!isLoggedIn
                        ? "Please login to rate and review this book"
                        : "Only members can rate and review books"}
                    </p>
                    {!isLoggedIn && (
                      <Button
                        onClick={() => router.push("/login")}
                        size="sm"
                        variant="primary"
                      >
                        Login to Review
                      </Button>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <label className="mb-2 block font-medium text-gray-700 text-sm">
                        Your Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            className="transition-transform hover:scale-110"
                            key={star}
                            onClick={() => setUserRating(star)}
                            type="button"
                          >
                            <Star
                              className={
                                userRating >= star
                                  ? "text-warning"
                                  : "text-gray-300"
                              }
                              size={32}
                              weight={
                                userRating >= star ? "BoldDuotone" : "Linear"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="mb-2 block font-medium text-gray-700 text-sm">
                        Your Review
                      </label>
                      <textarea
                        className="w-full rounded-lg border border-gray-400 p-2.5 hover:border-gray-700 focus:border-primary-light focus:outline-none"
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your thoughts about this book..."
                        rows={4}
                        value={reviewText}
                      />
                    </div>
                    <Button
                      disabled={!userRating || !reviewText.trim()}
                      variant="primary"
                    >
                      Submit Review
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Reviews List */}
          <div>
            {/* Reviews */}
            <div className="space-y-4">
              <h2 className="mb-4 font-bold text-2xl text-gray-900">
                Community Reviews ({reviewsResponse?.meta?.total_items || 0})
              </h2>
              {reviews.length > 0 ? (
                <>
                  {reviews.map((review) => (
                    <Card className="p-6" key={review.id}>
                      <div className="flex gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                          <Image
                            alt={review.user?.name || "User"}
                            className="object-cover"
                            fill
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || "U")}&background=3b82f6&color=fff`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {review.user?.name || "Anonymous"}
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      className={
                                        star <= review?.rating
                                          ? "text-warning"
                                          : "text-gray-300"
                                      }
                                      key={star}
                                      size={14}
                                      weight="BoldDuotone"
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-500 text-xs">
                                  {dayjs(review.createdAt).format(
                                    "MMM DD, YYYY",
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="mb-3 text-gray-700 leading-relaxed">
                            {review?.comment}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <button
                              className="flex items-center gap-1 text-gray-600 transition-colors hover:text-primary"
                              type="button"
                            ></button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Review Pagination */}
                  {reviewsResponse?.meta && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        meta={reviewsResponse.meta}
                        onPageChange={setReviewPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Card className="p-6">
                  <p className="text-center text-gray-500">
                    No reviews yet. Be the first to review!
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
