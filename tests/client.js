import fetch from "cross-fetch";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client/core";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/graphql", fetch }),
  cache: new InMemoryCache(),
});

export const getHello = gql`
  query Query {
    hello
  }
`;
