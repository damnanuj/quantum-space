import express from "express";
import protectRoute from "../lib/middleware/protectRoute.js";


import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/delete/:notificationId", protectRoute, deleteNotifications);

export default router;
