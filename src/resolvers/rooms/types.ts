import { MutationResolvers, QueryResolvers } from '../../generated/graphql';

export interface Queries {
  room: QueryResolvers['room'];
  rooms: QueryResolvers['rooms'];
  roomsByHotel: QueryResolvers['roomsByHotel'];
}

export interface Mutations {
  createRoom: MutationResolvers['createRoom'];
  updateRoom: MutationResolvers['updateRoom'];
  deleteRoom: MutationResolvers['deleteRoom'];
}
