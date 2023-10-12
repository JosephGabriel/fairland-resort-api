import { PutObjectCommand } from '@aws-sdk/client-s3';
import { GraphQLError } from 'graphql';

import { Mutations } from './types';

import { hashPassword, verifyPassword } from '../../utils/password';
import { signUpToken } from '../../utils/token';
import { s3 } from '../../utils/bucket';

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

  async createUser(parent, { data }, { prisma }) {
    if (data.password !== data.passwordConfirm) {
      throw new GraphQLError('As senhas não coincidem');
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    let avatarUrl = '';

    if (!data.avatar?.name) {
      avatarUrl =
        'https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png';
    } else {
      const fileArrayBuffer = await data.avatar.arrayBuffer();

      const imageName = `${new Date().getTime()}-${data.avatar?.name}`;

      const avatar = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: Buffer.from(fileArrayBuffer),
        ContentType: data.avatar.type,
      });

      await s3.send(avatar);

      avatarUrl = imageName;
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        avatar: avatarUrl,
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

  async createAdmin(parent, { data }, { prisma }) {
    if (data.password !== data.passwordConfirm) {
      throw new GraphQLError('As senhas não coincidem');
    }

    delete data.passwordConfirm;

    data.password = await hashPassword(data.password);

    let avatarUrl = '';

    if (!data.avatar?.name) {
      avatarUrl = `${process.env.BUCKET_URL}/default-profile.jpg`;
    } else {
      const fileArrayBuffer = await data.avatar.arrayBuffer();

      const imageName = `${new Date().getTime()}-${data.avatar?.name}`;

      const avatar = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: Buffer.from(fileArrayBuffer),
        ContentType: data.avatar.type,
      });

      await s3.send(avatar);

      avatarUrl = `${process.env.BUCKET_URL}`;
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        active: true,
        role: 'ADMIN',
        verified: true,
        avatar: avatarUrl,
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
