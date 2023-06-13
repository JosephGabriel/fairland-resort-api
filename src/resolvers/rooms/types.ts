import { QueryResolvers } from "../../generated/graphql";

export interface Queries {
  room: QueryResolvers["room"];
  rooms: QueryResolvers["rooms"];
  roomsByHotel: QueryResolvers["roomsByHotel"];
}
