import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

export const typeDefs = loadSchemaSync("src/**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
