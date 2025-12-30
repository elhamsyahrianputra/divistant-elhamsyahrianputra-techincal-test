/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");
