import { GraphQLScalarType, Kind, GraphQLError } from "graphql";
import validator from "validator";

const validate = (value) => {
  console.log(validator.isPostalCode(value, "any"));
  if (!validator.isPostalCode(value, "any")) {
    throw new GraphQLError(
      `Should receive a valid postal code but got: ${value}`
    );
  }

  return value;
};

const parseLiteral = (ast) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(`Expected a string but got: ${ast.kind}`);
  }

  return ast.value;
};

export const GraphQLPostalCode = new GraphQLScalarType({
  name: "PostalCode",
  description: "A valid postal code",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
