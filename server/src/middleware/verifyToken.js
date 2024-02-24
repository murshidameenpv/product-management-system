import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//verify user using jwt
export const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "token is invalid!" });
    }
    req.decoded = decoded;
    next();
  });
};
