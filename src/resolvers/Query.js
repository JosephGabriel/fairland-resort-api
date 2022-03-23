export const Query = {
  // Hotel
  async hotel(parent, { id }, { prisma }, info) {
    const hotel = await prisma.hotel.findUnique({ where: { id } });

    if (!hotel) {
      return new Error("Hotel inválido");
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
    const hotel = await prisma.hotel.findUnique({
      where: {
        slug,
      },
    });

    return hotel;
  },

  // Room
  async room(parent, { id }, { prisma }, info) {
    const room = await prisma.room.findUnique({ where: { id } });

    if (!room) {
      return new Error("Quarto inválido");
    }

    return room;
  },

  async rooms(parent, { filter }, { prisma }, info) {
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
