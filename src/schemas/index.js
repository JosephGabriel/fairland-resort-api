import { mergeTypeDefs } from "@graphql-tools/merge";

import fs from "fs";

const userTypeDefs = fs.readFileSync(`${__dirname}/user.graphql`).toString();

const hotelTypeDefs = fs.readFileSync(`${__dirname}/hotel.graphql`).toString();

const roomTypeDefs = fs.readFileSync(`${__dirname}/room.graphql`).toString();

const schemaTypeDefs = fs
  .readFileSync(`${__dirname}/schema.graphql`)
  .toString();

const bookingTypeDefs = fs
  .readFileSync(`${__dirname}/booking.graphql`)
  .toString();

const reviewTypeDefs = fs
  .readFileSync(`${__dirname}/review.graphql`)
  .toString();

const types = [
  schemaTypeDefs,
  userTypeDefs,
  bookingTypeDefs,
  hotelTypeDefs,
  reviewTypeDefs,
  roomTypeDefs,
];

export const typeDefs = mergeTypeDefs(types);
