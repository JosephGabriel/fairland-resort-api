import jwt, { JwtPayload } from "jsonwebtoken";

interface jsonwebtoken extends JwtPayload {
  id: string;
}

export const signUpToken = async (payload: string) => {
  const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = async (header: string) => {
  const payload = header.replace("Bearer ", "");

  const token = await jwt.verify(payload, process.env.JWT_SECRET);

  if (typeof token !== "string") {
    return token;
  }

  return null;
};
