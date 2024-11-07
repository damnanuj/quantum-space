import express from "express";
import protectRoute from "../lib/middleware/protectRoute.js";


// >>=====User controllers Imports============>>
import {
  followUnfollowUser,
  getUserProfile,
  getUserSuggestions,
  updateUserProfile,
} from "../controllers/userController.js";


const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggestions", protectRoute, getUserSuggestions);
router.get("/followUnfollow/:targetUserId", protectRoute, followUnfollowUser);
router.get("/update-profile", protectRoute, updateUserProfile);

export default router;
