import { TMutationResolvers } from '../../generated/graphql';

export interface Mutations {
  loginUser: TMutationResolvers['loginUser'];
  createUser: TMutationResolvers['createUser'];
  deactivateUser: TMutationResolvers['deactivateUser'];
  updateUser: TMutationResolvers['updateUser'];
  updateUserPassword: TMutationResolvers['updateUserPassword'];
  verifyUser: TMutationResolvers['verifyUser'];
}
