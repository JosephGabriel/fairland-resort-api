import { GraphQLScalarType, Kind, GraphQLError, ValueNode } from "graphql";
import { longitude } from "is-valid-coordinates";

const validate = (value: number) => {
  if (!longitude(value)) {
    throw new GraphQLError(
      `Should receive a valid longitude but got: ${value}`
    );
  }

  return value;
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.FLOAT) {
    throw new GraphQLError(`Expected a float but got: ${ast.kind}`);
  }

  return parseFloat(ast.value);
};

export const GraphQLLongitude = new GraphQLScalarType({
  name: "Longitude",
  description: "A valid longitude coordinate",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
