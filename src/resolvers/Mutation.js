import {
  AuthenticationError,
  ForbiddenError,
  ValidationError,
} from "apollo-server-errors";
import { PrismaClient } from "@prisma/client";
import { sendWelcomeMail } from "../utils/email";
import { signUpToken, veirfyToken } from "../utils/token";
import { hashPassword, verifyPassword } from "../utils/password";

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
    await prisma.user.deleteMany();

    const emailTaken = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailTaken) {
      throw new ValidationError("Este email já esta em uso");
    }

    if (data.password !== data.passwordConfirm) {
      throw new ValidationError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    const user = await prisma.user.create({ data });

    const token = await signUpToken(user.id);

    const url = `${req.req.protocol}://${req.req.get("host")}${
      req.req.originalUrl
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

  async verifyUser(parent, args, { req }, info) {
    const urlToken = req.req.originalUrl.split("/")[3];

    const result = await veirfyToken(urlToken);

    const user = await prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    if (!user) {
      throw new AuthenticationError("Usuário inválido");
    }

    const updatedUser = await prisma.user.update({
      where: { id: result.id },
      data: {
        verified: true,
      },
    });

    const token = await signUpToken(updatedUser.id);

    return {
      token,
      user,
    };
  },
};
