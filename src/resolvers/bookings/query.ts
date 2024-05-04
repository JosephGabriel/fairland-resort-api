import { GraphQLError } from 'graphql';

import { Queries } from './types';

export const BookingQueries: Queries = {
  async booking(parent, { id }, { prisma, user }) {
    const booking = await prisma.booking.findUnique({
      where: {
        id: id,
      },
      include: {
        room: true,
      },
    });

    if (!booking || booking.userId !== user.id) {
      throw new GraphQLError('Reserva não encontrada');
    }

    return booking;
  },
  async bookings(parent, args, { prisma }) {
    const bookings = await prisma.booking.findMany({
      // where: {
      //   room: {
      //     hotel: {
      //       admin: {
      //         id: user.id,
      //       },
      //     },
      //   },
      // },
      include: {
        room: true,
        user: true,
      },
    });

    console.log(bookings);

    return bookings;
  },
};
