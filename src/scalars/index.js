import { GraphQLUpload } from "graphql-upload";
import { GraphQLEmailAddress } from "./email";
import { GraphQLPassword } from "./password";
import { GraphQLLatitude } from "./latitude";
import { GraphQLLongitude } from "./longitude";
import { GraphQLPostalCode } from "./postal";

export const scalars = {
  Upload: GraphQLUpload,
  Password: GraphQLPassword,
  EmailAddress: GraphQLEmailAddress,
  Latitude: GraphQLLatitude,
  Longitude: GraphQLLongitude,
  PostalCode: GraphQLPostalCode,
};
