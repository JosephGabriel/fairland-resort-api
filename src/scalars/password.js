import { GraphQLScalarType, GraphQLError, Kind } from "graphql";
import validator from "validator";

const validate = (value) => {
  if (!validator.isLength(value, { min: 8 })) {
    throw new GraphQLError(
      `The password should be at lest 8 characters, but got: ${value.length}`
    );
  }

  if (!validator.isStrongPassword(value)) {
    throw new GraphQLError(
      `For the password to be valid it must have at lest 8 characters, have at least 1 special character, 1 capital letter, 1 number`
    );
  }

  if (validator.contains(value, "password", { ignoreCase: true })) {
    throw new GraphQLError(`The password should not contain password`);
  }

  return value;
};

const parseLiteral = (ast) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(`Can only parse strings but got ${ast.kind}`);
  }

  return ast.value;
};

export const GraphQLPassword = new GraphQLScalarType({
  name: "Password",
  description: "A valid password",
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
