import { User, Room, Booking } from "@prisma/client";

export interface UserModel extends User {}
export interface RoomModel extends Room {}
export interface BookingModel extends Booking {}
