import express from "express";

import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
// router.get("/validate-token", validateToken);

export default router;
