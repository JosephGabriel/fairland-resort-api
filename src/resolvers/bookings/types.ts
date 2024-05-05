import { MutationResolvers, QueryResolvers } from '../../generated/graphql';

export interface Mutations {
  createBooking: MutationResolvers['createBooking'];
  deleteBooking: MutationResolvers['deleteBooking'];
}

export interface Queries extends QueryResolvers {
  booking: QueryResolvers['booking'];
  bookingsByAdmin: QueryResolvers['bookingsByAdmin'];
}
