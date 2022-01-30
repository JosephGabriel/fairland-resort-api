import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ValidationError } from "apollo-server-errors";

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

    const isPasswordRight = await bcrypt.compare(data.password, user.password);

    if (!isPasswordRight) {
      throw new ValidationError("Email ou senha inválida");
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      token,
      user,
    };
  },

  async createUser(parent, { data }, ctx, info) {
    // await prisma.user.deleteMany();

    if (data.password !== data.passwordConfirm) {
      throw new ValidationError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({ data });

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      token,
      user,
    };
  },
};
