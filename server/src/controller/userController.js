import userDb from "../model/userSchema.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/token.js";
export const userSignUp = async (req, res) => {
  const { email, password, userName } = req.body;
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
    const token = generateToken(result._id); // generate token
    return res.status(200).json({ user: result, token }); // return user and token
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

    const token = generateToken(user._id); // generate token
    return res.status(200).json({ user, token }); // return user and token
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};
