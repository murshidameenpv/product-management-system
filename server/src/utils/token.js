import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const setTokenCookie = (res, token) => {
  res.cookie("access_token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
    httpOnly: true,
    sameSite: "None",
  });
};
