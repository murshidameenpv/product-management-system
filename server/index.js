import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./src/db/db.js";
import userRoute from "./src/routes/userRoutes.js";
import authRoute from "./src/routes/authRoute.js";
import productRoute from "./src/routes/productRoute.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://product-management-system-sgdt.onrender.com",
  })
);
//user
app.use("/api", userRoute);
app.use("/jwt", authRoute);
//product
app.use("/product", productRoute);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});
