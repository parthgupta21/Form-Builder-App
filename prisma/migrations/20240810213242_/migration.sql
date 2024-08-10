/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `form` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "form_userId_name_key" ON "form"("userId", "name");
