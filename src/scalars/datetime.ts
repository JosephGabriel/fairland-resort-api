import { GraphQLError, GraphQLScalarType, Kind, ValueNode } from 'graphql';

const serialize = (value: Date) => {
  const isDate = value instanceof Date;

  if (!isDate) {
    throw new GraphQLError(
      'GraphQL Date Scalar serializer expected a `Date` object'
    );
  }

  return new Date(value);
};

const parseValue = (value: Date) => {
  if (typeof value !== 'string') {
    throw new GraphQLError('GraphQL Date Scalar parser expected a `date`');
  }
  return new Date(value);
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(`Can only parse strings but got ${ast.kind}`);
  }

  return new Date(ast.value);
};

export const GraphQLDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize,
  parseValue,
  parseLiteral,
});
