import { UserMutations } from "./users/mutations";
import { HotelMutations } from "./hotels/mutations";
import { BookingMutations } from "./bookings/mutations";

import { MutationResolvers } from "../generated/graphql";

export const Mutation: MutationResolvers = {
  ...UserMutations,
  ...HotelMutations,
  ...BookingMutations,
};
