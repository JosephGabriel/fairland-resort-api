/*
  Warnings:

  - The `images` column on the `Hotel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "rating" DROP NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];
