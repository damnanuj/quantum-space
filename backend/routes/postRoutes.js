import express from "express";
import protectRoute from "../lib/middleware/protectRoute.js";
import {
  addComment,
  createPost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();
router.post("/create-post", protectRoute, createPost);
// router.get("/post/:id", protectRoute, getPostById);
// router.get("/posts", protectRoute, getAllPosts);
// router.put("/post/:id", protectRoute, updatePost);
router.delete("/delete-post/:id", protectRoute, deletePost);
// router.post("/post/:id/like-toggle", protectRoute, likeUnlikePost);
router.post("/post/:id/comment", protectRoute, addComment);
// router.delete("/post/:id/comment/:commentId", protectRoute, deleteComment);

export default router;
