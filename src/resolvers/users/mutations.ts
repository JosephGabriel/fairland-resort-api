import { GraphQLError } from 'graphql';

import { Mutations } from './types';

import { hashPassword, verifyPassword } from '../../utils/password';

import { signUpToken } from '../../utils/token';
import { uploadImage } from '../../utils/upload';

import { TUserRole } from '../../generated/graphql';

export const UserMutations: Mutations = {
  async loginUser(parent, { data }, { prisma }) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new GraphQLError('Email ou senha inválida');
    }

    const isPasswordRight = await verifyPassword(data.password, user.password);

    if (!isPasswordRight) {
      throw new GraphQLError('Email ou senha inválida');
    }

    const token = await signUpToken(user.id);

    return {
      token,
      user,
    };
  },

  async createUser(parent, { data }, { prisma, request }) {
    if (data.password !== data.passwordConfirm) {
      throw new GraphQLError('As senhas não coincidem');
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    const avatarUrl = data.avatar?.name
      ? await uploadImage(request, data.avatar)
      : `${request.headers.get('host')}/default-profile.jpeg`;

    const user = await prisma.user.create({
      data: {
        ...data,
        avatar: avatarUrl,
        role: data.role,
        active: data.role === TUserRole.Admin,
        verified: data.role === TUserRole.Admin,
      },
    });

    const token = await signUpToken(user.id);

    return {
      token,
      user,
    };
  },

  async deactivateUser(parent, args, { user, prisma }) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        active: false,
      },
    });

    return 'Usuário Desativado';
  },

  async updateUser(parent, { data }, { user, prisma }) {
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

  async updateUserPassword(parent, { data }, { user, prisma }) {
    if (data.password !== data.passwordConfirm) {
      throw new GraphQLError('As senhas não coincidem');
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

  async verifyUser(parent, args, { user, prisma }) {
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
