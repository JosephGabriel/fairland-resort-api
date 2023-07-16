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

  return new Promise<IJsonWebToken>((res, rej) => {
    jwt.verify(payload, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        switch (err.message) {
          case 'jwt expired':
            return rej(
              new GraphQLError('Token expirado, faça login novamente')
            );

          default:
            return rej(new GraphQLError('Token inválido'));
        }
      }

      res(decoded as IJsonWebToken);
    });
  });
};
