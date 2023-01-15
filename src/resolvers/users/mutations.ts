import { GraphQLError } from "graphql";

import { MutationResolvers } from "../../generated/graphql";

import { hashPassword, verifyPassword } from "../../utils/password";
import { signUpToken } from "../../utils/token";

interface Resolvers {
  loginUser: MutationResolvers["loginUser"];
  createUser: MutationResolvers["createUser"];
  createAdmin: MutationResolvers["createAdmin"];
  deactivateUser: MutationResolvers["deactivateUser"];
  updateUser: MutationResolvers["updateUser"];
  updateUserPassword: MutationResolvers["updateUserPassword"];
  verifyUser: MutationResolvers["verifyUser"];
}

export const UserMutations: Resolvers = {
  async loginUser(parent, { data }, { prisma }, info) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new GraphQLError("Email ou senha inválida");
    }

    const isPasswordRight = await verifyPassword(data.password, user.password);

    if (!isPasswordRight) {
      throw new GraphQLError("Email ou senha inválida");
    }

    const token = await signUpToken(user.id);

    return {
      token,
      user,
    };
  },

  async createUser(parent, { data }, { prisma }, info) {
    if (data.password !== data.passwordConfirm) {
      throw new GraphQLError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    const avatarUrl =
      "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png";

    const user = await prisma.user.create({
      data: {
        ...data,
        avatar: data.avatar ?? avatarUrl,
      },
    });

    const token = await signUpToken(user.id);

    // const url = `${req.protocol}://${req.get("host")}${
    //   req.originalUrl
    // }/verifyUser/${token}`;

    // if (process.env.NODE_ENV === "production") {
    //   await sendWelcomeMail(user.email, url, user.firstName);
    // }

    return {
      token,
      user,
    };
  },

  async createAdmin(parent, { data }, { prisma }, info) {
    if (data.password !== data.passwordConfirm) {
      throw new GraphQLError("As senhas não coincidem");
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    const avatarUrl =
      "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png";

    const user = await prisma.user.create({
      data: {
        ...data,
        active: true,
        role: "ADMIN",
        verified: true,
        avatar: data.avatar ?? avatarUrl,
      },
    });

    const token = await signUpToken(user.id);

    // const url = `${req.protocol}://${req.get("host")}${
    //   req.originalUrl
    // }/verifyUser/${token}`;

    // if (process.env.NODE_ENV === "production") {
    //   await sendWelcomeMail(user.email, url, user.firstName);
    // }

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

  async updateUser(parent, { data }, { user, prisma }, info) {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...data,
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
      throw new GraphQLError("As senhas não coincidem");
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
};