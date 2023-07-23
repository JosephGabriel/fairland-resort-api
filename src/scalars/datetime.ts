import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

const serialize = (value) => {
  if (value instanceof Date) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  }
  throw Error('GraphQL Date Scalar serializer expected a `Date` object');
};

const parseValue = (value) => {
  if (typeof value === 'number') {
    return new Date(value); // Convert incoming integer to Date
  }
  throw new Error('GraphQL Date Scalar parser expected a `number`');
};

const parseLiteral = (value: ValueNode) => {
  if (value.kind === Kind.STRING) {
    // Convert hard-coded AST string to integer and then to Date
    return new Date(parseInt(value.value, 10));
  }
  // Invalid hard-coded value (not an integer)
  return null;
};

export const dateScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize,
  parseValue,
  parseLiteral,
});
