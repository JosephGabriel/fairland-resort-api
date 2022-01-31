import { ForbiddenError, ValidationError } from "apollo-server-errors";
import { PrismaClient } from "@prisma/client";
import { sendWelcomeMail } from "../utils/email";
import { signUpToken, verifyToken } from "../utils/token";
import { hashPassword, verifyPassword } from "../utils/password";
import { userExists, userNotExists } from "../utils/user";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export const Mutation = {
  async loginUser(parent, { data }, ctx, info) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ValidationError("Email ou senha inválida");
    }

    const isPasswordRight = await verifyPassword(data.password, user.password);

    if (!isPasswordRight) {
      throw new ValidationError("Email ou senha inválida");
    }

    const token = await signUpToken(user.id);

    return {
      token,
      user,
    };
  },

  async createUser(parent, { data }, { req }, info) {
    await userExists(
      { email: data.email },
      prisma,
      "Este email já esta em uso"
    );

    if (data.password !== data.passwordConfirm) {
      throw new ValidationError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    if (data.avatar) {
      const { filename, createReadStream } = await data.avatar;

      const { ext, name } = path.parse(filename);

      const stream = createReadStream();

      const fileName = `${Date.now()}-${name}.${ext}`;

      const pathName = path.join(
        `${__dirname}/../../public/images/users/${fileName}`
      );

      await stream.pipe(fs.createWriteStream(pathName));

      const avatarUrl = `${req.protocol}://${req.get(
        "host"
      )}/images/users/${fileName}`;

      data.avatar = avatarUrl;
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
      throw new ForbiddenError(error.response.body.errors[0].message);
    }

    return {
      token,
      user,
    };
  },

  async deactivateUser(parent, args, { req }, info) {
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

  async updateUser(parent, { data }, { req }, info) {
    const header = req.headers.authorization.replace("Bearer ", "");
    const headerToken = await verifyToken(header);

    await userNotExists({ id: headerToken.id }, prisma);

    if (data.avatar) {
      const { filename, createReadStream } = await data.avatar;

      const { ext, name } = path.parse(filename);

      const stream = createReadStream();

      const fileName = `${Date.now()}-${name}.${ext}`;

      const pathName = path.join(
        `${__dirname}/../../public/images/users/${fileName}`
      );

      await stream.pipe(fs.createWriteStream(pathName));

      const avatarUrl = `${req.protocol}://${req.get(
        "host"
      )}/images/users/${fileName}`;

      data.avatar = avatarUrl;
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

  async updateUserPassword(parent, { data }, { req }, info) {
    const header = req.headers.authorization.replace("Bearer ", "");
    const headerToken = await verifyToken(header);

    await userExists({ id: headerToken.id }, prisma, "Usuário inválido");

    if (data.password !== data.passwordConfirm) {
      throw new ValidationError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

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

  async verifyUser(parent, args, { req }, info) {
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
};
