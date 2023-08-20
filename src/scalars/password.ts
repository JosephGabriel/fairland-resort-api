import { GraphQLScalarType, GraphQLError, Kind, ValueNode } from 'graphql';
import validator from 'validator';

const validate = (value: string) => {
  if (!validator.isLength(value, { min: 8 })) {
    throw new GraphQLError(
      `A senha deve ter no mínimo 8 caracteres, mas tem: ${value.length}`
    );
  }

  if (!validator.isStrongPassword(value)) {
    throw new GraphQLError(
      'Para a senha ser válida ela deve ter no mínimo 8 caracteres, ter no mínimo 1 caractere especial, 1 letra maiúscula, 1 número'
    );
  }

  if (validator.contains(value, 'password', { ignoreCase: true })) {
    throw new GraphQLError('A senha não deve conter password');
  }

  if (validator.contains(value, 'senha', { ignoreCase: true })) {
    throw new GraphQLError('A senha não deve conter senha');
  }

  return value;
};

const parseLiteral = (ast: ValueNode) => {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError(
      `Formato inválido! necessário um texto, mas obteve ${ast.kind}`
    );
  }

  return ast.value;
};

export const GraphQLPassword = new GraphQLScalarType({
  name: 'Password',
  description:
    'A valid password should have at lest 8 characters, one special character, one capital letter, one lowercase letter, one number and should not contain the word "password" or "senha"',
  serialize: validate,
  parseValue: validate,
  parseLiteral: parseLiteral,
});
