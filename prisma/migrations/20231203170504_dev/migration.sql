-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotelId_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
