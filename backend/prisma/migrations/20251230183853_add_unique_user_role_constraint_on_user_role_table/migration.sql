/*
  Warnings:

  - A unique constraint covering the columns `[userId,roleId]` on the table `user_role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_role_userId_roleId_key" ON "user_role"("userId", "roleId");
