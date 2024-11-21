import express from "express";
import { authenticateToken } from "../lib/middleware/authenticateToken.js";
import {
  createPost,
  deletePost,
  addComment,
  getPostById,
  getAllPosts,
  likeUnlikePost,
  getLikedPosts,
  getFollowingPosts,
  // updatePost,
  // deleteComment,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", authenticateToken, createPost);
router.delete("/delete/:postId", authenticateToken, deletePost);
router.get("/get-one/:postId", authenticateToken, getPostById);
router.get("/get-all", authenticateToken, getAllPosts);
router.get("/get-following-posts", authenticateToken, getFollowingPosts);
// router.put("/update/:postId", authenticateToken, updatePost);

//========== Like and Comment Subroutes============>>
router.post("/like-unlike/:postId", authenticateToken, likeUnlikePost);
router.get("/liked-posts/:userId", authenticateToken, getLikedPosts);
router.post("/add-comment/:postId", authenticateToken, addComment);
// router.delete("/delete-comment:postId/:commentId", authenticateToken, deleteComment);

export default router;
