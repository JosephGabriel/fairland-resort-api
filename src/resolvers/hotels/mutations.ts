import { GraphQLError } from 'graphql';
import slugify from 'slugify';

import { Mutations } from './types';

export const HotelMutations: Mutations = {
  async createHotel(parent, { data }, { prisma, user }) {
    const hotel = await prisma.hotel.create({
      data: {
        ...data,
        slug: slugify(data.name, { lower: true }),
        admin: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        admin: true,
        room: true,
      },
    });

    return hotel;
  },

  async updateHotel(parent, { id, data }, { prisma }) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new GraphQLError('Este hotel não existe');
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updatedHotel;
  },

  async deleteHotel(parent, { id }, { prisma }) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new GraphQLError('Este hotel não existe');
    }

    await prisma.hotel.delete({
      where: { id },
    });

    return 'Hotel apagado com sucesso';
  },
};
