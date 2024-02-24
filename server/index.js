import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./src/db/db.js";
import cookieParser from "cookie-parser";
import userRoute from './src/routes/userRoutes.js'
import authRoute from './src/routes/authRoute.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", userRoute);
app.use("/jwt", authRoute);


app.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});  