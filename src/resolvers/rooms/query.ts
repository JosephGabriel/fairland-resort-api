import { GraphQLError } from "graphql";

import { Queries } from "./types";

export const RoomQueries: Queries = {
  async room(parent, { id }, { prisma }, info) {
    const room = await prisma.room.findUnique({ where: { id } });

    if (!room) {
      throw new GraphQLError("Quarto inválido");
    }

    return room;
  },

  async rooms(parent, { filter }, { prisma }, info) {
    const rooms = await prisma.room.findMany({
      where: {
        price: {
          lte: filter?.maxPrice,
          gte: filter?.minPrice,
        },
        rating: {
          lte: filter?.maxRating,
          gte: filter?.minRating,
        },
      },
    });

    return rooms;
  },

  async roomsByHotel(parent, { hotel }, { prisma }, info) {
    const rooms = await prisma.room.findMany({
      where: {
        hotel: {
          id: hotel,
        },
      },
    });

    return rooms;
  },
};
