import { GraphQLError } from "graphql";
import slugify from "slugify";

import { MutationResolvers } from "../../generated/graphql";

interface Resolvers {
  createHotel: MutationResolvers["createHotel"];
  updateHotel: MutationResolvers["updateHotel"];
  deleteHotel: MutationResolvers["deleteHotel"];
}

export const HotelMutations: Resolvers = {
  async createHotel(parent, { data }, { prisma, user }, info) {
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
    });

    return hotel;
  },

  async updateHotel(parent, { id, data }, { user, prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new GraphQLError("Este hotel não existe");
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updatedHotel;
  },

  async deleteHotel(parent, { id }, { prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new GraphQLError("Este hotel não existe");
    }

    await prisma.hotel.delete({
      where: { id },
    });

    return "Hotel apagado com sucesso";
  },
};
