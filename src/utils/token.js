import jwt from "jsonwebtoken";

export const signUpToken = async (payload) => {
  const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = async (req) => {
  try {
    const payload = req.headers.authorization.replace("Bearer ", "");
    const token = await jwt.verify(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.err(error);
    throw new Error("Token inválido");
  }
};
