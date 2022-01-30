import { GraphQLUpload } from "graphql-upload";
import { GraphQLEmailAddress } from "./email";
import { GraphQLPassword } from "./password";

export const scalars = {
  Upload: GraphQLUpload,
  Password: GraphQLPassword,
  EmailAddress: GraphQLEmailAddress,
};
