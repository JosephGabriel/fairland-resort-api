import { GraphQLError } from 'graphql';

import { Queries } from './types';

export const HotelQueries: Queries = {
  async hotel(parent, { id, roomOptions }, { prisma }) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        rooms: {
          take: roomOptions?.take,
          skip: roomOptions?.skip,
          orderBy: {
            createdAt: roomOptions?.orderBy,
          },
        },
      },
    });

    if (!hotel) {
      throw new GraphQLError('Hotel inválido');
    }

    return hotel;
  },

  async hotels(parent, { roomOptions }, { prisma }) {
    const hotels = await prisma.hotel.findMany({
      include: {
        rooms: {
          take: roomOptions?.take,
          skip: roomOptions?.skip,
          orderBy: {
            createdAt: roomOptions?.orderBy,
          },
        },
      },
    });

    return hotels;
  },

  async hotelBySlug(parent, { slug }, { prisma }) {
    const hotel = await prisma.hotel.findFirst({
      where: {
        slug,
      },
      include: {
        rooms: true,
      },
    });

    if (!hotel) {
      throw new GraphQLError('Hotel inválido');
    }

    return hotel;
  },

  async hotelsByAdmin(parent, { options }, { prisma, user }) {
    const [hotels, count] = await prisma.$transaction([
      prisma.hotel.findMany({
        take: options?.take,
        skip: options?.skip,
        orderBy: {
          createdAt: options?.orderBy,
        },
        where: {
          admin: {
            id: user.id,
          },
        },
        include: {
          rooms: true,
        },
      }),
      prisma.hotel.count({
        where: {
          admin: {
            id: user.id,
          },
        },
      }),
    ]);

    return {
      hotels,
      count,
    };
  },
};
