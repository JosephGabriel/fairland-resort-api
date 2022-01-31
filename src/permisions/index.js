import { AuthenticationError } from "apollo-server-errors";
import { shield, rule, chain } from "graphql-shield";
import { verifyToken } from "../utils/token";
import { userExists } from "../utils/user";

const isLoggedin = rule()(async (parent, args, { req }, info) => {
  const user = req.headers.authorization.replace("Bearer ", "");

  if (user) return true;

  throw new AuthenticationError("Faça login para continuar!");
});

const isAdmin = rule()(async (parent, args, { req, prisma }, info) => {
  const user = req.headers.authorization.replace("Bearer ", "");
  const userId = verifyToken(user);

  const hasUser = await userExists({ id: userId.id }, prisma);

  return hasUser.role === "ADMIN";
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
