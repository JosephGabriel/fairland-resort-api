import { TMutationResolvers } from '../../generated/graphql';

export interface Mutations {
  loginUser: TMutationResolvers['loginUser'];
  createUser: TMutationResolvers['createUser'];
  createAdmin: TMutationResolvers['createAdmin'];
  deactivateUser: TMutationResolvers['deactivateUser'];
  updateUser: TMutationResolvers['updateUser'];
  updateUserPassword: TMutationResolvers['updateUserPassword'];
  verifyUser: TMutationResolvers['verifyUser'];
}
