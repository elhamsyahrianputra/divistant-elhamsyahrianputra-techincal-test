"use client";

import { Star } from "@solar-icons/react";
import Link from "next/link";
import { books, genres } from "@/data/mockData";

export default function Page() {
  const featuredBook = [...books].sort(
    (a, b) => b.averageRating - a.averageRating,
  )[0];

  const newArrivals = books.filter((b) => b.publishedYear === 2024).slice(0, 4);

  const editorPicks = books.filter((b) => b.id !== featuredBook.id).slice(0, 3);

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* <Header /> */}

      <main className="container mx-auto px-4 pt-24 pb-16 lg:pt-28">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary text-sm">
                <Star size={16} />
                Welcome to BookNest
              </div>
              <h1 className="mb-6 font-bold font-display text-4xl text-foreground leading-tight lg:text-5xl xl:text-6xl">
                Discover Stories That
                <span className="block text-primary">Inspire You</span>
              </h1>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                Your personal library awaits. Explore curated collections, read
                authentic reviews, and find your next literary adventure.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* <Button asChild className="gap-2" size="lg">
                  <Link href="/search">
                    Start Exploring
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/genre/fiction">Browse Genres</Link>
                </Button> */}
              </div>
            </div>

            {/* Featured Book Card */}
            <div className="relative">
              <div className="-inset-4 absolute rounded-3xl bg-gradient-to-r from-primary/20 to-primary/5 blur-2xl"></div>
              <Link
                className="group relative block rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30"
                href={`/book/${featuredBook.id}`}
              >
                <div className="mb-4 flex items-center gap-2 font-medium text-primary text-sm">
                  {/* <TrendingUp className="h-4 w-4" /> */}
                  Featured Book
                </div>
                <div className="flex gap-6">
                  <img
                    alt={featuredBook.title}
                    className="aspect-[2/3] w-32 rounded-xl object-cover shadow-lg transition-shadow group-hover:shadow-xl lg:w-40"
                    src={featuredBook.cover}
                  />
                  <div className="flex-1">
                    <h2 className="mb-2 font-bold font-display text-foreground text-xl transition-colors group-hover:text-primary lg:text-2xl">
                      {featuredBook.title}
                    </h2>
                    <p className="mb-3 text-muted-foreground">
                      by {featuredBook.author.name}
                    </p>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">
                          {featuredBook.averageRating}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        ({featuredBook.totalReviews} reviews)
                      </span>
                    </div>
                    <p className="line-clamp-3 text-muted-foreground text-sm">
                      {featuredBook.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Genre Access */}
        <section className="py-8 lg:py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display font-semibold text-2xl text-foreground">
              Browse by Genre
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {genres
              .filter((g) => g.slug !== "all")
              .map((genre) => (
                <Link
                  className="group rounded-xl border border-border/50 bg-card p-4 text-center transition-all hover:border-primary/30 hover:bg-primary/5"
                  href={`/genre/${genre.slug}`}
                  key={genre.id}
                >
                  <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                    {genre.name}
                  </span>
                </Link>
              ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-8 lg:py-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <BookMarked className="h-5 w-5 text-primary" /> */}
              <h2 className="font-display font-semibold text-2xl text-foreground">
                New Arrivals
              </h2>
            </div>
            <Link
              className="text-primary text-sm hover:underline"
              href="/search"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {newArrivals.map((book) => (
              <Link className="group" href={`/book/${book.id}`} key={book.id}>
                <div className="mb-3 aspect-[2/3] overflow-hidden rounded-xl bg-accent/30">
                  <img
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={book.cover}
                  />
                </div>
                <h3 className="line-clamp-1 font-display font-semibold text-foreground transition-colors group-hover:text-primary">
                  {book.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {book.author.name}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-foreground text-sm">
                    {book.averageRating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Editor's Picks */}
        <section className="py-8 lg:py-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="text-primary" size={20} />
              <h2 className="font-display font-semibold text-2xl text-foreground">
                Editor's Picks
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
            {editorPicks.map((book) => (
              <Link
                className="group flex gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30"
                href={`/book/${book.id}`}
                key={book.id}
              >
                <img
                  alt={book.title}
                  className="aspect-[2/3] w-20 rounded-lg object-cover"
                  src={book.cover}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 line-clamp-1 font-display font-semibold text-foreground transition-colors group-hover:text-primary">
                    {book.title}
                  </h3>
                  <p className="mb-2 text-muted-foreground text-sm">
                    {book.author.name}
                  </p>
                  <div className="mb-2 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-foreground text-sm">
                      {book.averageRating}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-muted-foreground text-xs">
                    {book.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 text-center lg:p-12">
            <h2 className="mb-4 font-bold font-display text-2xl text-foreground lg:text-3xl">
              Ready to Find Your Next Read?
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
              Use our powerful search to discover books by title, author, or
              keyword. Filter by genre and find exactly what you're looking for.
            </p>
            {/* <Button asChild className="gap-2" size="lg">
              <Link href="/search">
                Search Books
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button> */}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-border/50 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 BookNest. A place for book lovers.
          </p>
        </div>
      </footer>
    </div>
  );
}
