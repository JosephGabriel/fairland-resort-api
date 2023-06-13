import { Queries } from "./types";

export const BookingQueries: Queries = {
  async bookings(parent, args, { prisma, user }, info) {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        room: true,
      },
    });

    return bookings;
  },
};
