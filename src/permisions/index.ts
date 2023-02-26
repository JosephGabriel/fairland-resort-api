import { shield, rule, chain } from "graphql-shield";
import { ShieldRule } from "graphql-shield/typings/types";
import { GraphQLError } from "graphql";

import { verifyToken } from "../utils/token";
import { ServerContext } from "../index";

const hasUser: ShieldRule = rule()(
  async (parent, { data }, { prisma }: ServerContext, info) => {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      return new GraphQLError("Este email já esta em uso");
    }

    return true;
  }
);

const isLoggedin: ShieldRule = rule()(
  async (parent, args, ctx: ServerContext, info) => {
    const header = ctx.request.headers.get("Authorization");

    if (!header) {
      return new GraphQLError("Você não esta logado");
    }

    const userId = await verifyToken(header);

    if (userId === null) {
      return new GraphQLError("Token inválido");
    }

    const userExists = await await ctx.prisma.user.findUnique({
      where: { id: userId.id },
    });

    if (!userExists) {
      return new GraphQLError("Você não esta logado");
    }

    const timeToken = new Date(userId.iat).getTime();

    const passwordChangedAt = new Date(userExists.passwordChangedAt).getTime();

    if (timeToken < passwordChangedAt && passwordChangedAt > 0) {
      return new GraphQLError(
        "Você trocou sua senha recentemente, faça login novamente"
      );
    }

    ctx.user = userExists;

    return true;
  }
);

const isAdmin: ShieldRule = rule()(async (parent, args, { user }, info) => {
  if (user && user.role === "ADMIN" && user.verified && user.active) {
    return true;
  }

  return new GraphQLError("É necessário um administrador para continuar");
});

export const permisions = shield<any, ServerContext>(
  {
    Mutation: {
      createUser: hasUser,
      createAdmin: hasUser,
      verifyUser: isLoggedin,
      updateUser: isLoggedin,
      deactivateUser: isLoggedin,
      updateUserPassword: isLoggedin,
      createHotel: chain(isLoggedin, isAdmin),
      updateHotel: chain(isLoggedin, isAdmin),
      deleteHotel: chain(isLoggedin, isAdmin),
    },
  },
  {
    allowExternalErrors: true,
    debug: true,
  }
);
