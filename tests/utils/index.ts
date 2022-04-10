import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";

import { prisma } from "../../src/index";
import { User } from "@prisma/client";
import { signUpToken } from "../../src/utils/token";

interface userForTest {
  user: User | {};
  token: string;
}

export const getClient = (authHeader?: string) =>
  new ApolloClient({
    link: new HttpLink({
      headers: {
        authorization: `Bearer ${authHeader}`,
      },
      uri: "http://localhost:4000/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

export let userForTest: userForTest = {
  user: {},
  token: "",
};

export const setupDatabase = async () => {
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();

  const passwordHashed = await bcrypt.hash("Daredevil95!", 10);

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      firstName: "Test",
      lastName: "Test",
      userName: "Test",
      active: true,
      verified: true,
      role: "ADMIN",
      password: passwordHashed,
    },
  });

  userForTest.user = user;
  userForTest.token = await signUpToken(user.id);
};
