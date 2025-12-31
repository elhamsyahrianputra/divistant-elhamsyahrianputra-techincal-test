/*
  Warnings:

  - You are about to drop the column `published_at` on the `books` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT,
    "publishedAt" DATETIME,
    "coverUrl" TEXT,
    "pages" INTEGER,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_books" ("coverUrl", "createdAt", "description", "id", "isbn", "pages", "slug", "title", "updatedAt") SELECT "coverUrl", "createdAt", "description", "id", "isbn", "pages", "slug", "title", "updatedAt" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
