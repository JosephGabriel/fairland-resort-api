import { GraphQLError } from "graphql";

import { QueryResolvers } from "../generated/graphql";

export const Query: QueryResolvers = {
  // Hotel
  async hotel(parent, { id }, { prisma }, info) {
    const hotel = await prisma.hotel.findUnique({ where: { id } });

    if (!hotel) {
      throw new GraphQLError("Hotel inválido");
    }

    return hotel;
  },

  async hotels(parent, args, { prisma }, info) {
    const hotels = await prisma.hotel.findMany();

    return hotels;
  },

  async hotelsByAdmin(parent, { id }, { prisma }, info) {
    const hotel = await prisma.hotel.findMany({
      where: {
        admin: {
          id: id,
        },
      },
    });

    return hotel;
  },

  async hotelBySlug(parent, { slug }, { prisma }, info) {
    const hotel = await prisma.hotel.findFirst({
      where: {
        slug: slug,
      },
    });

    if (!hotel) {
      throw new GraphQLError("Hotel inválido");
    }

    return hotel;
  },

  // Room
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
