import { GraphQLEmailAddress } from '../scalars/email';
import { GraphQLLatitude } from '../scalars/latitude';
import { GraphQLLongitude } from '../scalars/longitude';
import { GraphQLPassword } from '../scalars/password';
import { GraphQLPostalCode } from '../scalars/postal';

import { Resolvers } from '../generated/graphql';

import { UserMutations } from './users/mutations';
import { HotelMutations } from './hotels/mutations';
import { BookingMutations } from './bookings/mutations';
import { RoomMutations } from './rooms/mutations';

import { HotelQueries } from './hotels/query';
import { RoomQueries } from './rooms/query';
import { BookingQueries } from './bookings/query';

export const resolvers: Resolvers = {
  Query: {
    ...HotelQueries,
    ...RoomQueries,
    ...BookingQueries,
  },
  Mutation: {
    ...UserMutations,
    ...HotelMutations,
    ...BookingMutations,
    ...RoomMutations,
  },
  Latitude: GraphQLLatitude,
  Longitude: GraphQLLongitude,
  EmailAddress: GraphQLEmailAddress,
  Password: GraphQLPassword,
  PostalCode: GraphQLPostalCode,
};
