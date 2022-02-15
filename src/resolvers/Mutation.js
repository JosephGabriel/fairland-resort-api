import { sendWelcomeMail } from "../utils/email";
import { signUpToken, verifyToken } from "../utils/token";
import { hashPassword, verifyPassword } from "../utils/password";
import { userExists, userNotExists } from "../utils/user";
import slugify from "slugify";

import {
  deleteMultipleUploadedFiles,
  deleteUploadedFile,
  uploadMultipleImages,
  uploadSingleImage,
} from "../utils/upload";

export const Mutation = {
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
    await userExists(
      { email: data.email },
      prisma,
      "Este email já esta em uso"
    );

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

    try {
      await sendWelcomeMail(user.email, url, user.firstName);
    } catch (error) {
      console.log(error.response.body);
      throw new Error(error.response.body.errors[0].message);
    }

    return {
      token,
      user,
    };
  },

  async deactivateUser(parent, args, { req, prisma }, info) {
    const header = req.headers.authorization.replace("Bearer ", "");
    const headerToken = await verifyToken(header);

    const user = await prisma.user.findUnique({
      where: {
        id: headerToken.id,
      },
    });

    if (!user) {
      throw new ValidationError("Usúario inválido");
    }

    await prisma.user.update({
      where: { id },
      data: {
        active: false,
      },
    });

    return "Usuário Desativado";
  },

  async updateUser(parent, { data }, { req, prisma }, info) {
    const header = req.headers.authorization.replace("Bearer ", "");
    const headerToken = await verifyToken(header);

    await userNotExists({ id: headerToken.id }, prisma);

    if (data.avatar) {
      data.avatar = await uploadSingleImage(data.avatar, req, "users");
    }

    const updatedUser = await prisma.user.update({
      where: { id: headerToken.id },
      data: { ...data },
    });

    const token = await signUpToken(updatedUser.id);

    return {
      token,
      user: updatedUser,
    };
  },

  async updateUserPassword(parent, { data }, { req, prisma }, info) {
    const header = req.headers.authorization.replace("Bearer ", "");
    const headerToken = await verifyToken(header);

    await userExists({ id: headerToken.id }, prisma, "Usuário inválido");

    if (data.password !== data.passwordConfirm) {
      throw new ValidationError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    data.passwordChangedAt = Date.now();

    const user = await prisma.user.update({
      where: { id: headerToken.id },
      data: { ...data },
    });

    const token = await signUpToken(user.id);

    return {
      token,
      user,
    };
  },

  async verifyUser(parent, args, { req, prisma }, info) {
    const header = req.headers.authorization.replace("Bearer ", "");
    const headerToken = await verifyToken(header);

    await userNotExists({ id: headerToken.id }, prisma);

    const updatedUser = await prisma.user.update({
      where: { id: headerToken.id },
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
  async createHotel(parent, { data }, { req, prisma }, info) {
    data.latitude = parseFloat(data.latitude);

    data.longitude = parseFloat(data.longitude);

    data.slug = slugify(data.name, { lower: true });

    data.logo = await uploadSingleImage(data.logo, req, "logos");

    data.thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");

    data.images = await uploadMultipleImages(data.images, req, "hotels");

    const hotel = await prisma.hotel.create({ data });

    return hotel;
  },

  async updateHotel(parent, { id, data }, { req }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: { id: parseInt(id) },
    });

    if (data.logo) {
      await deleteUploadedFile(hotel.logo);
      data.logo = await uploadSingleImage(data.logo, req, "logos");
    }

    if (data.thumbnail) {
      await deleteUploadedFile(hotel.thumbnail);

      data.thumbnail = await uploadSingleImage(
        data.thumbnail,
        req,
        "thumbnails"
      );
    }

    if (data.images) {
      await deleteMultipleUploadedFiles(hotel.images);

      data.images = await uploadMultipleImages(data.images, req, "hotels");
    }

    const updatedHotel = await prisma.hotel.update({
      where: { id: parseInt(id) },
      data,
    });

    return updatedHotel;
  },

  async deleteHotel(parent, { id }, { prisma }, info) {
    await prisma.hotel.delete({
      where: { id: parseInt(id) },
    });

    return "Hotel apagado com sucesso";
  },

  // Room Mutations
  async createRoom(parent, { data }, { req, prisma }, info) {
    data.thumbnail = await uploadSingleImage(data.thumbnail, req, "thumbnails");

    data.images = await uploadMultipleImages(data.images, req, "rooms");

    const hotel = await prisma.hotel.findUnique({
      where: {
        id: parseInt(data.hotel),
      },
    });

    if (!hotel) {
      throw new Error("Hotel inválido");
    }

    const hotelId = data.hotel;

    delete data.hotel;

    const room = await prisma.room.create({
      data: {
        ...data,
        hotel: {
          connect: {
            id: parseInt(hotelId),
          },
        },
      },
    });

    return room;
  },

  async updateRoom(parent, { id, data }, { req, prisma, user }, info) {
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
      where: { id: parseInt(id) },
      data: {
        ...data,
      },
    });

    return room;
  },

  async deleteRoom(parent, { id }, { prisma }, info) {
    await prisma.hotel.delete({
      where: { id: parseInt(id) },
    });

    return "Hotel apagado com sucesso";
  },
};
