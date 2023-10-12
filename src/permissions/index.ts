import { GraphQLError } from 'graphql';
import { chain, rule, shield } from 'graphql-shield';
import { ShieldRule } from 'graphql-shield/typings/types';

import { verifyToken } from '../utils/token';

import { ServerContext } from '../../globals';

const hasUser: ShieldRule = rule()(
  async (parent, { data }, { prisma }: ServerContext) => {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      return new GraphQLError('Este email já esta em uso');
    }

    return true;
  }
);

const isLoggedin: ShieldRule = rule()(
  async (parent, args, ctx: ServerContext) => {
    const header = ctx.request.headers.get('authorization');

    if (!header) {
      return new GraphQLError('Você não esta logado');
    }

    const userId = await verifyToken(header);

    if (userId === null) {
      return new GraphQLError('Token inválido');
    }

    const userExists = await await ctx.prisma.user.findUnique({
      where: { id: userId.id },
    });

    if (!userExists) {
      return new GraphQLError('Você não esta logado');
    }

    const timeToken = new Date(userId.iat).getTime();

    const passwordChangedAt = new Date(userExists.passwordChangedAt).getTime();

    if (timeToken < passwordChangedAt && passwordChangedAt > 0) {
      return new GraphQLError(
        'Você trocou sua senha recentemente, faça login novamente'
      );
    }

    ctx.user = userExists;

    return true;
  }
);

const isAdmin: ShieldRule = rule()(async (parent, args, { user }) => {
  if (user && user.role === 'ADMIN' && user.verified && user.active) {
    return true;
  }

  return new GraphQLError('É necessário um administrador para continuar');
});

export const permissions = shield(
  {
    Mutation: {
      createUser: hasUser,
      createAdmin: hasUser,
      verifyUser: isLoggedin,
      updateUser: isLoggedin,
      deactivateUser: isLoggedin,
      updateUserPassword: isLoggedin,
      createBooking: isLoggedin,
      deleteBooking: isLoggedin,
      createHotel: chain(isLoggedin, isAdmin),
      updateHotel: chain(isLoggedin, isAdmin),
      deleteHotel: chain(isLoggedin, isAdmin),
      createRoom: chain(isLoggedin, isAdmin),
      updateRoom: chain(isLoggedin, isAdmin),
      deleteRoom: chain(isLoggedin, isAdmin),
    },
    Query: {
      booking: isLoggedin,
      bookings: isLoggedin,
      hotelsByAdmin: chain(isLoggedin, isAdmin),
    },
  },
  {
    allowExternalErrors: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
  }
);
