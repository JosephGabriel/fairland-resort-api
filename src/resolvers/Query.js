import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Query = {
  hello() {
    return "Hello World";
  },

  // Hotel
  async hotel(parent, { id }, ctx, info) {
    const hotel = await prisma.hotel.findUnique({ where: { id } });

    if (!hotel) {
      return new Error("Hotel inválido");
    }

    return hotel;
  },

  async hotels(parent, args, ctx, info) {
    const hotels = await prisma.hotel.findMany();

    return hotels;
  },

  async hotelBySlug(parent, { slug }, ctx, info) {
    const hotel = await prisma.hotel.findUnique({
      where: {
        slug,
      },
    });

    return hotel;
  },

  // Room
  async room(parent, { id }, ctx, info) {
    const room = await prisma.room.findUnique({ where: { id } });

    if (!room) {
      return new Error("Quarto inválido");
    }

    return room;
  },

  async rooms(parent, { filter }, ctx, info) {
    const rooms = await prisma.room.findMany({
      where: {
        price: {
          lte: filter.maxPrice,
          gte: filter.minPrice,
        },
        rating: {
          lte: filter.maxRating,
          gte: filter.minRating,
        },
      },
    });

    return rooms;
  },

  async roomsByHotel(parent, { hotel }, ctx, info) {
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
