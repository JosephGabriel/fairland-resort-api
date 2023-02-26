import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { User } from "@prisma/client";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";

import { prisma } from "../../src/index";
import { signUpToken } from "../../src/utils/token";

interface userForTest {
  user: User | null;
  token: string;
  raw_password: string;
}

export const getClient = (authHeader?: string) =>
  authHeader
    ? new ApolloClient({
        link: new HttpLink({
          headers: {
            authorization: `Bearer ${authHeader}`,
          },
          uri: `http://localhost:${process.env.PORT}/graphql`,
          fetch,
        }),
        cache: new InMemoryCache(),
      })
    : new ApolloClient({
        link: new HttpLink({
          uri: `http://localhost:${process.env.PORT}/graphql`,
          fetch,
        }),
        cache: new InMemoryCache(),
      });

export let userForTest: userForTest = {
  user: null,
  token: "",
  raw_password: "Daredevil95!",
};

export const setupDatabase = async () => {
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();

  const passwordHashed = await bcrypt.hash(userForTest.raw_password, 10);

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      firstName: "Test",
      lastName: "Test",
      userName: "Test",
      active: true,
      verified: false,
      role: "USER",
      password: passwordHashed,
    },
  });

  userForTest.user = user;
  userForTest.token = await signUpToken(user.id);
};
