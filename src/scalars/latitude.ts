import { GraphQLScalarType, Kind, GraphQLError } from "graphql";
import { latitude } from "is-valid-coordinates";

const validate = (value) => {
  if (!latitude(value)) {
    throw new GraphQLError(`Should receive a valid latitude but got: ${value}`);
  }

  return value;
};

const parseLiteral = (ast) => {
  if (ast.kind !== Kind.FLOAT) {
    throw new GraphQLError(`Expected a float but got: ${ast.kind}`);
  }

  return parseFloat(ast.value);
};

export const GraphQLLatitude = new GraphQLScalarType({
  name: "Latitude",
  description: "A valid latitude",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
