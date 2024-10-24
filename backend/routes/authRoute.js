import express from "express";
import { protectRoute } from "../lib/middleware/protectRoute.js";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/authController.js";

const router = express.Router();


router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
