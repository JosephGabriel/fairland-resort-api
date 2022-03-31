import { sendWelcomeMail } from "../utils/email";
import { signUpToken } from "../utils/token";
import { hashPassword, verifyPassword } from "../utils/password";

import slugify from "slugify";

import {
  deleteMultipleUploadedFiles,
  deleteUploadedFile,
  uploadMultipleImages,
  uploadSingleImage,
} from "../utils/upload";
import { MutationResolvers } from "../generated/graphql";

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

    if (data.avatar) {
      data.avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const user = await prisma.user.create({ data });

    const token = await signUpToken(user.id);

    const url = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }/verifyUser/${token}`;

    await sendWelcomeMail(user.email, url, user.firstName);

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

    if (data.avatar) {
      data.avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        active: true,
        role: "ADMIN",
        verified: true,
      },
    });

    const token = await signUpToken(user.id);

    const url = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }/verifyUser/${token}`;

    await sendWelcomeMail(user.email, url, user.firstName);

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
    if (data.avatar) {
      data.avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        avatar: data.avatar ?? undefined,
        email: data.email ?? undefined,
        firstName: data.firstName ?? undefined,
        lastName: data.lastName ?? undefined,
        userName: data.userName ?? undefined,
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
    data.latitude = parseFloat(data.latitude);

    data.longitude = parseFloat(data.longitude);

    data.logo = await uploadSingleImage(data.logo, req, "logos");

    data.thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");

    data.images = await uploadMultipleImages(data.images, req, "hotels");

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

  async updateHotel(parent, { id, data }, { req, user, prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (data.logo) {
      await deleteUploadedFile(hotel?.logo);
      data.logo = await uploadSingleImage(data.logo, req, "logos");
    }

    if (data.thumbnail) {
      await deleteUploadedFile(hotel?.thumbnail);

      data.thumbnail = await uploadSingleImage(
        data.thumbnail,
        req,
        "thumbnails"
      );
    }

    if (data.images) {
      await deleteMultipleUploadedFiles(hotel?.images);

      data.images = await uploadMultipleImages(data.images, req, "hotels");
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data,
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

    data.thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");

    data.images = await uploadMultipleImages(data.images, req, "rooms");

    const room = await prisma.room.create({
      data: {
        ...data,
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
    const hasRoom = await prisma.room.update({
      where: { id },
      data: {
        ...data,
      },
    });

    if (!hasRoom) {
      throw new Error("Quarto inválido");
    }

    if (data.thumbnail) {
      await deleteUploadedFile(data.thumbnail);

      data.thumbnail = await uploadSingleImage(
        data.thumbnail,
        req,
        "thumbnails"
      );
    }

    if (data.images) {
      await deleteMultipleUploadedFiles(data.images);

      data.images = await uploadMultipleImages(data.images, req, "rooms");
    }

    const room = await prisma.room.update({
      where: { id },
      data: {
        ...data,
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