import express from "express";
import { authenticateToken } from "../lib/middleware/authenticateToken.js";

// >>=====User controllers Imports============>>
import {
  followUnfollowUser,
  getUserProfile,
  getUserSuggestions,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:usernameOrId", authenticateToken, getUserProfile);
router.get("/suggestions", authenticateToken, getUserSuggestions);
router.get(
  "/followUnfollow/:targetUserId",
  authenticateToken,
  followUnfollowUser
);
router.post("/update-profile", authenticateToken, updateUserProfile);

export default router;
