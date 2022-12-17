import { GraphQLScalarType, Kind, GraphQLError } from "graphql";
import { longitude } from "is-valid-coordinates";

const validate = (value) => {
  if (!longitude(value)) {
    throw new GraphQLError(
      `Should receive a valid longitude but got: ${value}`
    );
  }

  return value;
};

const parseLiteral = (ast) => {
  if (ast.kind !== Kind.FLOAT) {
    throw new GraphQLError(`Expected a float but got: ${ast.kind}`);
  }

  return parseFloat(ast.value);
};

export const GraphQLLongitude = new GraphQLScalarType({
  name: "Longitude",
  description: "A valid longitude",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
