/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `authors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authors_slug_key" ON "authors"("slug");
