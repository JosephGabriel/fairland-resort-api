import { GraphQLScalarType, GraphQLError, Kind, ValueNode } from 'graphql';
import validator from 'validator';

const validate = (value: string) => {
  if (typeof value !== 'string') {
    throw new GraphQLError(`The value: ${value} is not a string`);
  }

  if (!validator.isEmail(value)) {
    throw new GraphQLError(`The value: ${value} is not a valid email`);
  }

  return value;
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(`Can only parse strings but got ${ast.kind}`);
  }

  return ast.value;
};

export const GraphQLEmailAddress = new GraphQLScalarType({
  name: 'EmailAddress',
  description: 'A valid email address',
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
