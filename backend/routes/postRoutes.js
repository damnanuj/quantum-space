import express from "express";
import protectRoute from "../lib/middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  addComment,
  getPostById,
  getAllPosts,
  likeUnlikePost,
  getLikedPosts
  // updatePost,
  // deleteComment,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create-post", protectRoute, createPost);
router.delete("/delete-post/:postId", protectRoute, deletePost);
router.get("/get-one/:postId", protectRoute, getPostById);
router.get("/get-all", protectRoute, getAllPosts);
// router.put("/update/:postId", protectRoute, updatePost);

//========== Like and Comment Subroutes============>>
router.post("/like-unlike/:postId", protectRoute, likeUnlikePost);
router.get("/liked-posts/:userId", protectRoute, getLikedPosts);
router.post("/add-comment/:postId", protectRoute, addComment);
// router.delete("/delete-comment:postId/:commentId", protectRoute, deleteComment);

export default router;
