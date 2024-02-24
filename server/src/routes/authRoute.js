import express from "express";
import { verifyUser } from "../controller/authController.js";
const router = express.Router();
router.get("/verify", verifyUser);

export default router;
