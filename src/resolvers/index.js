import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { scalars } from "../scalars";

export const resolvers = {
  ...scalars,
  Query,
  Mutation,
};
