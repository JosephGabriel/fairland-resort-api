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
  async bookingsByUser(parent, args, { prisma, user }) {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        room: {
          include: {
            hotel: true,
          },
        },
      },
    });

    return bookings;
  },
  async bookingsByAdmin(parent, args, { prisma, user }) {
    const bookings = await prisma.booking.findMany({
      where: {
        room: {
          hotel: {
            admin: {
              id: user.id,
            },
          },
        },
      },
      include: {
        room: {
          include: {
            hotel: true,
          },
        },
        user: true,
      },
    });

    return bookings;
  },
};
