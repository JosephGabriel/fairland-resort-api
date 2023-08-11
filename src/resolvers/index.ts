import { GraphQLEmailAddress } from '../scalars/email';
import { GraphQLLatitude } from '../scalars/latitude';
import { GraphQLLongitude } from '../scalars/longitude';
import { GraphQLPassword } from '../scalars/password';
import { GraphQLPostalCode } from '../scalars/postal';
import { GraphQLDateTime } from '../scalars/datetime';

import { Resolvers } from '../generated/graphql';

import { UserMutations } from '../resolvers/users/mutations';
import { HotelMutations } from '../resolvers/hotels/mutations';
import { BookingMutations } from '../resolvers/bookings/mutations';
import { RoomMutations } from '../resolvers/rooms/mutations';

import { HotelQueries } from '../resolvers/hotels/query';
import { RoomQueries } from '../resolvers/rooms/query';
import { BookingQueries } from '../resolvers/bookings/query';

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
  DateTime: GraphQLDateTime,
};
