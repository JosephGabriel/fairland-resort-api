import { GraphQLError } from "graphql";

import { MutationResolvers } from "../../generated/graphql";

interface Resolvers {
  createBooking: MutationResolvers["createBooking"];
}

export const BookingMutations: Resolvers = {
  async createBooking(parent, { data }, { prisma, user }, info) {
    const hasRoom = await prisma.room.findUnique({
      where: {
        id: data?.room,
      },
    });

    if (!hasRoom) {
      throw new GraphQLError("Quarto inválido");
    }

    const booking = await prisma.booking.create({
      data: {
        ...data,
        paid: false,
        bookingDate: Date.now().toString(),
        room: {
          connect: {
            id: data?.room,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return booking;
  },
};
