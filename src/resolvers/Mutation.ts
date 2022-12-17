import { sendWelcomeMail } from "../utils/email";
import { signUpToken } from "../utils/token";
import { hashPassword, verifyPassword } from "../utils/password";
import { MutationResolvers } from "../generated/graphql";

import slugify from "slugify";

import {
  deleteMultipleUploadedFiles,
  deleteUploadedFile,
  uploadMultipleImages,
  uploadSingleImage,
} from "../utils/upload";

export const Mutation: MutationResolvers = {
  // User Mutations
  async loginUser(parent, { data }, { prisma }, info) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("Email ou senha inválida");
    }

    const isPasswordRight = await verifyPassword(data.password, user.password);

    if (!isPasswordRight) {
      throw new Error("Email ou senha inválida");
    }

    const token = await signUpToken(user.id);

    return {
      token,
      user,
    };
  },

  async createUser(parent, { data }, { req, prisma }, info) {
    if (data.password !== data.passwordConfirm) {
      throw new Error("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    let avatar: string;

    if (data.avatar) {
      avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        avatar,
      },
    });

    const token = await signUpToken(user.id);

    const url = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }/verifyUser/${token}`;

    if (process.env.NODE_ENV === "production") {
      await sendWelcomeMail(user.email, url, user.firstName);
    }

    return {
      token,
      user,
    };
  },

  async createAdmin(parent, { data }, { req, prisma }, info) {
    if (data.password !== data.passwordConfirm) {
      throw new Error("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    let avatar: string;

    if (data.avatar) {
      avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        avatar,
        active: true,
        role: "ADMIN",
        verified: true,
      },
    });

    const token = await signUpToken(user.id);

    const url = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }/verifyUser/${token}`;

    if (process.env.NODE_ENV === "production") {
      await sendWelcomeMail(user.email, url, user.firstName);
    }

    return {
      token,
      user,
    };
  },

  async deactivateUser(parent, args, { user, prisma }, info) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        active: false,
      },
    });

    return "Usuário Desativado";
  },

  async updateUser(parent, { data }, { req, user, prisma }, info) {
    let avatar: string;

    if (data.avatar) {
      avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...data,
        avatar,
      },
    });

    const token = await signUpToken(updatedUser.id);

    return {
      token,
      user: updatedUser,
    };
  },

  async updateUserPassword(parent, { data }, { user, prisma }, info) {
    if (data.password !== data.passwordConfirm) {
      throw new Error("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    const activeUser = await prisma.user.update({
      where: { id: user.id },
      data: { ...data, passwordChangedAt: Date.now().toString() },
    });

    const token = await signUpToken(activeUser.id);

    return {
      token,
      user: activeUser,
    };
  },

  async verifyUser(parent, args, { user, prisma }, info) {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
      },
    });

    const token = await signUpToken(updatedUser.id);

    return {
      token,
      user: updatedUser,
    };
  },

  // Hotel Mutations
  async createHotel(parent, { data }, { req, prisma, user }, info) {
    const logo = await uploadSingleImage(data.logo, req, "logos");

    const thumbnail = await uploadSingleImage(
      data.thumbnail,
      req,
      "thumbnails"
    );

    const images = await uploadMultipleImages(data.images, req, "hotels");

    const hotel = await prisma.hotel.create({
      data: {
        ...data,
        latitude: data.latitude,
        longitude: data.longitude,
        logo,
        thumbnail,
        images,
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

  async updateHotel(parent, { id, data }, { req, user, prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    let logo: string;
    let thumbnail: string;
    let images: string[];

    if (data.logo) {
      await deleteUploadedFile(hotel?.logo);
      logo = await uploadSingleImage(data.logo, req, "logos");
    }

    if (data.thumbnail) {
      await deleteUploadedFile(hotel?.thumbnail);

      thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");
    }

    if (data.images) {
      await deleteMultipleUploadedFiles(hotel?.images);

      images = await uploadMultipleImages(data.images, req, "hotels");
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: {
        ...data,
        logo,
        images,
        thumbnail,
      },
    });

    return updatedHotel;
  },

  async deleteHotel(parent, { id }, { prisma }, info) {
    await prisma.hotel.delete({
      where: { id },
    });

    return "Hotel apagado com sucesso";
  },

  // Room Mutations
  async createRoom(parent, { data }, { req, prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: data.hotel,
      },
    });

    if (!hotel) {
      throw new Error("Hotel inválido");
    }

    let thumbnail: string;
    let images: string[];

    thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");

    images = await uploadMultipleImages(data.images, req, "rooms");

    const room = await prisma.room.create({
      data: {
        ...data,
        thumbnail,
        images,
        hotel: {
          connect: {
            id: data.hotel,
          },
        },
      },
    });

    return room;
  },

  async updateRoom(parent, { id, data }, { req, prisma }, info) {
    const hasRoom = await prisma.room.findUnique({
      where: { id },
    });

    let thumbnail: string;
    let images: string[];

    if (!hasRoom) {
      throw new Error("Quarto inválido");
    }

    if (data.thumbnail) {
      await deleteUploadedFile(data.thumbnail);

      thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");
    }

    if (data.images) {
      await deleteMultipleUploadedFiles(data.images);

      images = await uploadMultipleImages(data.images, req, "rooms");
    }

    const room = await prisma.room.update({
      where: { id },
      data: {
        ...data,
        thumbnail,
        images,
      },
    });

    return room;
  },

  async deleteRoom(parent, { id }, { prisma }, info) {
    const room = await prisma.room.findUnique({
      where: { id },
    });

    if (!room) {
      throw new Error("Quarto inválido");
    }

    await deleteUploadedFile(room.thumbnail);

    await deleteMultipleUploadedFiles(room.images);

    await prisma.hotel.delete({
      where: { id },
    });

    return "Quarto apagado com sucesso";
  },

  // Booking Mutations
  async createBooking(parent, { data }, { prisma, user }, info) {
    const hasRoom = await prisma.room.findUnique({
      where: {
        id: data?.room,
      },
    });

    if (!hasRoom) {
      throw new Error("Quarto inválido");
    }

    const booking = await prisma.booking.create({
      data: {
        ...data,
        paid: false,
        bookingDate: Date.now().toString(),
        room: {
          connect: {
            id: data?.room,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return booking;
  },
};
