import { shield, rule, chain } from "graphql-shield";
import { verifyToken } from "../utils/token";

const isLoggedin = rule()(async (parent, args, { req, prisma }, info) => {
  const user = req.headers.authorization.replace("Bearer ", "");
  const userId = await verifyToken(user);

  const userExists = await await prisma.user.findUnique({
    where: { id: userId.id },
  });

  if (userExists) return true;

  throw new Error("Faça login para continuar!");
});

const isAdmin = rule()(async (parent, args, { req, prisma }, info) => {
  const user = req.headers.authorization.replace("Bearer ", "");
  const userId = await verifyToken(user);

  const hasUser = await prisma.user.findUnique({ where: { id: userId.id } });

  if (hasUser.role === "ADMIN" && hasUser.verified && hasUser.active) {
    return true;
  }

  throw new Error(
    "Para realizar esta ação é necessário um administrador válido!"
  );
});

export const permisions = shield({
  Mutation: {
    verifyUser: isLoggedin,
    updateUser: isLoggedin,
    deactivateUser: isLoggedin,
    updateUserPassword: isLoggedin,
    createHotel: chain(isLoggedin, isAdmin),
    updateHotel: chain(isLoggedin, isAdmin),
    deleteHotel: chain(isLoggedin, isAdmin),
  },
});
