import { shield, rule, chain } from "graphql-shield";
import { verifyToken } from "../utils/token";

const isLoggedin = rule()(async (parent, args, ctx, info) => {
  const header = ctx.req.headers.authorization;

  if (!header) {
    return Error("Você não esta logado");
  }

  const userId = await verifyToken(ctx.req);

  const userExists = await await ctx.prisma.user.findUnique({
    where: { id: parseInt(userId.id) },
  });

  console.log(userExists);
  ctx.user = userExists;

  if (userExists) {
    return true;
  } else {
    return new Error("Você não esta logado");
  }
});

const isAdmin = rule()(async (parent, args, ctx, info) => {
  const userId = await verifyToken(ctx.req);

  const hasUser = await ctx.prisma.user.findUnique({
    where: { id: parseInt(userId.id) },
  });

  if (
    hasUser &&
    hasUser.role === "ADMIN" &&
    hasUser.verified &&
    hasUser.active
  ) {
    ctx.user = hasUser;
    return true;
  } else {
    return new Error("É necessário um administrador válido para continuar");
  }
});

export const permisions = shield(
  {
    Mutation: {
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
    fallbackError: process.env.NODE_ENV === "production",
  }
);
