import {
  MutationResolvers,
  QueryResolvers,
  HotelResolvers,
} from "../../generated/graphql";

export interface Mutations {
  createHotel: MutationResolvers["createHotel"];
  updateHotel: MutationResolvers["updateHotel"];
  deleteHotel: MutationResolvers["deleteHotel"];
}

export interface Queries {
  hotel: QueryResolvers["hotel"];
  hotels: QueryResolvers["hotels"];
  hotelBySlug: QueryResolvers["hotelBySlug"];
  hotelsByAdmin: QueryResolvers["hotelsByAdmin"];
}
