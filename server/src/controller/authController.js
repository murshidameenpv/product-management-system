import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = (req, res) => {
  const authHeader = req.headers.authorization;
  try {
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized Access" });
      }
      res.status(200).json({message:"User Authorized"});
    });
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the user." });
  }
};
