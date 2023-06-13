import { GraphQLScalarType, Kind, GraphQLError, ValueNode } from "graphql";
import { latitude } from "is-valid-coordinates";

const validate = (value: number) => {
  if (!latitude(value)) {
    throw new GraphQLError(`Should receive a valid latitude but got: ${value}`);
  }

  return value;
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.FLOAT) {
    throw new GraphQLError(`Expected a float but got: ${ast.kind}`);
  }

  return parseFloat(ast.value);
};

export const GraphQLLatitude = new GraphQLScalarType({
  name: "Latitude",
  description: "A valid latitude coordinate",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
