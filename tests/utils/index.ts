import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export const setupDatabase = async () => {};
