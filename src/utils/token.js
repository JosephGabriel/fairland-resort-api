import jwt from "jsonwebtoken";

export const signUpToken = async (payload) => {
  const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const veirfyToken = async (payload) => {
  const token = await jwt.verify(payload, process.env.JWT_SECRET);
  return token;
};
