import { GraphQLError } from "graphql";

import { Queries } from "./types";

export const HotelQueries: Queries = {
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
};
