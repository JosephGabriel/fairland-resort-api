import { MutationResolvers } from "../../generated/graphql";

export interface Mutations {
  loginUser: MutationResolvers["loginUser"];
  createUser: MutationResolvers["createUser"];
  createAdmin: MutationResolvers["createAdmin"];
  deactivateUser: MutationResolvers["deactivateUser"];
  updateUser: MutationResolvers["updateUser"];
  updateUserPassword: MutationResolvers["updateUserPassword"];
  verifyUser: MutationResolvers["verifyUser"];
}
