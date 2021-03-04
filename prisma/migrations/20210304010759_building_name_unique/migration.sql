/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Building`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Building.name_unique" ON "Building"("name");
