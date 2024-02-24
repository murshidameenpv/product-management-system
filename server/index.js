import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./src/db/db.js";
import cookieParser from "cookie-parser";
import userRoute from './src/routes/userRoutes.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});  