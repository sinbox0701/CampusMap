/*
  Warnings:

  - Made the column `major` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "major" SET NOT NULL;
