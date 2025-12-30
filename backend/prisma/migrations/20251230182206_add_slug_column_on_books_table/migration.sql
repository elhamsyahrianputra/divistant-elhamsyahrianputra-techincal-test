/*
  Warnings:

  - Added the required column `slug` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT,
    "published_at" DATETIME,
    "coverUrl" TEXT,
    "pages" INTEGER,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_books" ("coverUrl", "createdAt", "description", "id", "isbn", "pages", "published_at", "title", "updatedAt") SELECT "coverUrl", "createdAt", "description", "id", "isbn", "pages", "published_at", "title", "updatedAt" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
