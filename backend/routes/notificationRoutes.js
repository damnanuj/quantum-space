import express from "express";
import { authenticateToken } from "../lib/middleware/authenticateToken.js";

import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", authenticateToken, getNotifications);
router.delete("/delete/:notificationId", authenticateToken, deleteNotifications);

export default router;
