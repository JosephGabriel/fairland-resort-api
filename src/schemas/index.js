import { mergeTypeDefs } from "@graphql-tools/merge";

import fs from "fs";

const schemaTypeDefs = fs
  .readFileSync(`${__dirname}/schema.graphql`)
  .toString();

const userTypeDefs = fs.readFileSync(`${__dirname}/user.graphql`).toString();

const types = [schemaTypeDefs, userTypeDefs];

export const typeDefs = mergeTypeDefs(types);
