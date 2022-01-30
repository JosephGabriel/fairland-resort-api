import { GraphQLScalarType, GraphQLError, Kind } from "graphql";
import validator from "validator";

const validate = ({ value }) => {
  if (typeof value !== "string") {
    throw new GraphQLError(`The value: ${value} is not a string`);
  }

  if (!validator.isEmail(value)) {
    throw new GraphQLError(`The value: ${value} is not a valid email`);
  }

  return value;
};

const parseLiteral = (ast) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(`Can only parse strings but got ${ast.kind}`);
  }

  return ast;
};

export const GraphQLEmailAddress = new GraphQLScalarType({
  name: "EmailAddress",
  description: "A valid email",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
