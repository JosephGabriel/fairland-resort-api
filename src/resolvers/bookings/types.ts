import { MutationResolvers, QueryResolvers } from "../../generated/graphql";

export interface Mutations {
  createBooking: MutationResolvers["createBooking"];
  deleteBooking: MutationResolvers["deleteBooking"];
}

export interface Queries {
  booking: QueryResolvers["booking"];
  bookings: QueryResolvers["bookings"];
}
