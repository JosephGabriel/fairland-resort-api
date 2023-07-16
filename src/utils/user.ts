import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

export const userExists = async (
  condition,
  prisma: PrismaClient,
  message = 'Usuário inválido'
) => {
  const userExists = await prisma.user.findUnique({
    where: condition,
  });

  if (userExists) {
    throw new GraphQLError(message);
  }

  return userExists;
};

export const userNotExists = async (
  condition,
  prisma: PrismaClient,
  message = 'Usuário inválido'
) => {
  const userExists = await prisma.user.findUnique({
    where: condition,
  });

  if (!userExists) {
    throw new GraphQLError(message);
  }

  return userExists;
};
