import { BookingResolvers } from "../../generated/graphql";

export const Booking: BookingResolvers = {
  async user(parent, args, { prisma }, info) {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
  async room(parent, args, { prisma }, info) {
    return prisma.room.findUnique({
      where: {
        id: parent.roomId,
      },
    });
  },
};
