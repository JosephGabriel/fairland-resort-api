import { Query } from "./Query";
import { Mutation } from "./Mutation";

import { GraphQLEmailAddress } from "../scalars/email";
import { GraphQLLatitude } from "../scalars/latitude";
import { GraphQLLongitude } from "../scalars/longitude";
import { GraphQLPassword } from "../scalars/password";
import { GraphQLPostalCode } from "../scalars/postal";

import { Resolvers } from "../generated/graphql";

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Latitude: GraphQLLatitude,
  Longitude: GraphQLLongitude,
  EmailAddress: GraphQLEmailAddress,
  Password: GraphQLPassword,
  PostalCode: GraphQLPostalCode,
};
