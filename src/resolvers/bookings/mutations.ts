import { GraphQLError } from "graphql";

import { Mutations } from "./types";

export const BookingMutations: Mutations = {
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
        paid: true,
        dateIn: new Date(data?.dateIn),
        dateOut: new Date(data?.dateOut),
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
      include: {
        room: true,
        user: true,
      },
    });

    return booking;
  },

  async deleteBooking(parent, { id }, { prisma, user }, info) {
    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
    });

    if (!booking || booking.userId !== user.id) {
      throw new GraphQLError("Reserva não encontrada");
    }

    await prisma.booking.delete({
      where: {
        id: id,
      },
    });

    return "Reserva cancelada com sucesso";
  },
};
