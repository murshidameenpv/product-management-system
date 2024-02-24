import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userDb from "../model/userSchema.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

dotenv.config();

export const userSignUp = async (req, res) => {
  const { email, password, userName } = req.body;
  console.log(email, password, userName);
  const query = { email: email };
  try {
    const userExist = await userDb.findOne(query);
    if (userExist) {
      return res.status(409).json({ message: "User already Exist" });
    }
    const hashedPassword = await hashPassword(password);
    const result = await userDb.create({
      email,
      userName,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
      httpOnly: true,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new user" });
  }
};


export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await userDb.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // Check if password is correct
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid email or password" });

    // User is authenticated, issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in cookie
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
      httpOnly: true,
    });

    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};
