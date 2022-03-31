import { shield, rule, chain } from "graphql-shield";
import { verifyToken } from "../utils/token";
import { ServerContext } from "../index";

const hasUser = rule()(
  async (parent, { data }, { prisma }: ServerContext, info) => {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      return new Error("Este email já esta em uso");
    }

    return true;
  }
);

const isLoggedin = rule()(async (parent, args, ctx: ServerContext, info) => {
  const header = ctx.req.headers.authorization;

  if (!header) {
    return new Error("Você não esta logado");
  }

  const userId = await verifyToken(header);

  if (userId === null) {
    return new Error("Token inválido");
  }

  const userExists = await await ctx.prisma.user.findUnique({
    where: { id: userId.id },
  });

  if (!userExists) {
    return new Error("Você não esta logado");
  }

  const timeToken = Math.floor(userId.iat);

  const passwordChangedAt = Math.floor(
    new Date(userExists.passwordChangedAt).getMilliseconds() / 1000 + 60 * 60
  );

  if (timeToken > passwordChangedAt) {
    return new Error("Você não esta logado");
  }

  ctx.user = userExists;
  return true;
});

const isAdmin = rule()(async (parent, args, { user }, info) => {
  if (user && user.role === "ADMIN" && user.verified && user.active) {
    return true;
  }

  return new Error("É necessário um administrador para continuar");
});

export const permisions = shield(
  {
    Mutation: {
      loginUser: isLoggedin,
      createUser: hasUser,
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
    allowExternalErrors: process.env.NODE_ENV !== "production",
    fallbackError:
      process.env.NODE_ENV === "production" ? "Erro no servidor" : undefined,
  }
);
