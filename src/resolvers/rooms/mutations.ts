import { GraphQLError } from 'graphql';

import { Mutations } from './types';

export const RoomMutations: Mutations = {
  createRoom: async (parent, { data }, { prisma }) => {
    const hasHotel = await prisma.hotel.findUnique({
      where: {
        id: data.hotel,
      },
    });

    if (!hasHotel) {
      throw new GraphQLError('Hotel inválido');
    }

    const room = await prisma.room.create({
      data: {
        ...data,
        hotel: {
          connect: {
            id: data.hotel,
          },
        },
      },
      include: {
        hotel: true,
      },
    });

    return room;
  },

  updateRoom: async (parent, { id, data }, { prisma }) => {
    const hasRoom = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!hasRoom) {
      throw new GraphQLError('Quarto inválido');
    }

    const room = await prisma.room.update({
      where: {
        id,
      },
      data,
      include: {
        hotel: true,
      },
    });

    return room;
  },

  deleteRoom: async (parent, { id }, { prisma }) => {
    const hasRoom = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!hasRoom) {
      throw new GraphQLError('Quarto inválido');
    }

    await prisma.room.delete({
      where: {
        id,
      },
    });

    return 'Quarto deletado com sucesso';
  },
};
