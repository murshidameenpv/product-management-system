import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//verify user using jwt
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "You are not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: "Token is not valid" });
    req.user = user;
    next();
  });
};
