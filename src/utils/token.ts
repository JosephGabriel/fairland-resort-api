import { GraphQLError } from 'graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface IJsonWebToken extends JwtPayload {
  id: string;
}

export const signUpToken = async (payload: string): Promise<string> => {
  const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = async (header: string): Promise<IJsonWebToken> => {
  const payload = header.replace('Bearer ', '');

  try {
    const decoded = await jwt.verify(payload, process.env.JWT_SECRET);

    return decoded as IJsonWebToken;
  } catch (error) {
    switch (error.message) {
      case 'jwt expired':
        throw new GraphQLError('Token expirado, faça login novamente');

      default:
        throw new GraphQLError('Token inválido');
    }
  }
};
