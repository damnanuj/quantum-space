import express from "express";
import {protectRoute} from "../lib/middleware/protectRoute.js"
import { followUnfollowUser, getUserProfile } from "../controllers/userController.js";

const router = express.Router()

router.get("/profile/:username",protectRoute, getUserProfile)
// router.get("/suggested",protectRoute, getSuggestions)
router.get("/followUnfollow/:targetUserId", protectRoute, followUnfollowUser)
// router.get("/update",protectRoute, updateUserProfile)

export default router