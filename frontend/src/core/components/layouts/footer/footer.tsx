"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary-lighter text-gray-700">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2 font-bold text-primary text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-lg text-white">
                B
              </div>
              <span>BookNest</span>
            </div>
            <p className="text-gray-600 text-sm">
              Discover your next favorite book and connect with millions of
              readers worldwide.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/search"
                >
                  Search Books
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/genres"
                >
                  Browse Genres
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/featured"
                >
                  Featured Books
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/bestsellers"
                >
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/my-books"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/reviews"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/groups"
                >
                  Book Clubs
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/authors"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 transition-colors hover:text-primary"
                  href="/terms"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-gray-300 border-t pt-8 md:flex-row">
          <p className="text-gray-600 text-sm">
            © 2024 BookNest. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              className="text-gray-700 transition-colors hover:text-primary"
              href="#"
            >
              Twitter
            </Link>
            <Link
              className="text-gray-700 transition-colors hover:text-primary"
              href="#"
            >
              Facebook
            </Link>
            <Link
              className="text-gray-700 transition-colors hover:text-primary"
              href="#"
            >
              Instagram
            </Link>
            <Link
              className="text-gray-700 transition-colors hover:text-primary"
              href="#"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
