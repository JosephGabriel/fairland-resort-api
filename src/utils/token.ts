import jwt from "jsonwebtoken";

export const signUpToken = async (payload) => {
  const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = async (header) => {
  const payload = header.replace("Bearer ", "");

  const token = await jwt.verify(
    payload,
    process.env.JWT_SECRET,
    function (err, decode) {
      return err ? null : decode;
    }
  );
  return token;
};
