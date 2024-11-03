import express from "express";
import protectRoute from "../lib/middleware/protectRoute.js";


// >>=====User controllers Imports============>>
import {
  followUnfollowUser,
  getUserProfile,
  getSuggestedUsers,
  updateUserProfile,
} from "../controllers/userController.js";


const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/followUnfollow/:targetUserId", protectRoute, followUnfollowUser);
router.get("/updateProfile", protectRoute, updateUserProfile);

export default router;
