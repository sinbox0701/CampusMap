/*
  Warnings:

  - Added the required column `buildingId` to the `Floor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Floor" ADD COLUMN     "buildingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Floor" ADD FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;
