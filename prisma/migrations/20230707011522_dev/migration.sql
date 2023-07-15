/*
  Warnings:

  - Added the required column `city` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `Hotel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ALTER COLUMN "rating" SET NOT NULL;
