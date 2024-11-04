import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notficationModel.js";

//>>=================createPost===================>>
export const createPost = async (req, res) => {
  try {
    const { caption, image: rawImage } = req.body;
    const userId = req.user._id;

    //>>============Find user in Db==========>>
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User Not Found",
        message: "The specified user could not be found.",
      });
    }
    //>>============either caption or image is provided==========>>
    if (!caption && !rawImage) {
      return res.status(400).json({
        success: false,
        message: "Post must have a caption or an image",
      });
    }
    //>>============Upload image if provided==========>>
    let image = null;
    if (rawImage) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(rawImage);
        image = uploadedResponse.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
          error: uploadError.message,
        });
      }
    }
    // >>==========Create and save new post===========>>
    const newPost = new Post({
      user: userId,
      caption,
      image,
    });
    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { post: newPost },
    });
  } catch (error) {
    console.error("Error in createPost Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>=================deletePost===================>>
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // >>==== Validate the post ID =====>>
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid post ID",
        message: "The provided post ID is not valid.",
      });
    }

    // >>==== Find the post by ID =====>>
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found!",
      });
    }

    // >>====post belongs to authenticated user or not! =====>>
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).send({
        success: false,
        message: "You are not authorized to delete this post!",
      });
    }

    // >>==== Delete image from Cloudinary if not null=====>>
    if (post.image) {
      try {
        const publicId = post.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Cloudinary deletion error:", error.message);
        return res.status(500).json({
          success: false,
          message: "Error deleting image from Cloudinary",
          error: error.message,
        });
      }
    }

    // >>==== Delete the post from database =====>>
    await post.deleteOne();
    // const deletedPost = await Post.findByIdAndDelete(req.params.id);

    // >>==== Send success response =====>>
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      //   data: deletedPost,
    });
  } catch (error) {
    console.error("Error in deletePost Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>================= Add Comment Controller ===================>>
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user._id;
    const postId = req.params.postId;

    // >>==== Validate the post ID =====>>
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid post ID",
        message: "The provided post ID is not valid.",
      });
    }

    // >>==== Validate if comment text is provided ====>>
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    // >>==== Fetch the Post by ID ====>>
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // >>==== Adding the Comment to the Post ====>>
    const newComment = {
      text: comment,
      user: userId,
    };
    post.comments.push(newComment);

    // >>==== Saving the Updated Post ====>>
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: {
        postId: post._id,
        comments: post.comments,
      },
    });
  } catch (error) {
    console.error("Error in addComment Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>================= get one Post By Id ===================>>
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    // >>==== Validate the post ID =====>>
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid post ID",
        message: "The provided post ID is not valid.",
      });
    }

    // >>==== Fetch the Post by ID ====>>
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "One post fetched successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error in fetching one post :", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>=========== Get All Posts / also specific for userId =============>>
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const userId = req.query.userId;

    // >>==== Query Configuration ====>>
    const query = userId ? { user: userId } : {}; // Filter by user if userId is provided
    const skip = (page - 1) * limit; //number of documents to skip for pagination

    // >>==== Fetch Posts with Sorting and Pagination ====>>
    const posts = await Post.find(query)
      .populate("user", "-password") // Populate user info
      .sort({ createdAt: -1 }) // most recent posts
      .skip(skip)
      .limit(limit);

    // >>==== Handle Empty Posts Case ====>>
    if (posts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No posts found",
      });
    }

    // >>==== Success Response with Pagination Info ====>>
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      pagination: {
        currentPage: page,
        postsPerPage: limit,
      },
      data: posts,
    });
  } catch (error) {
    console.error("Error in getAllPosts Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>=========== Like/Unlike Post +notification ===========>>
export const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    // >>==== Validate the Post ID =====>
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid post ID",
        message: "The provided post ID is not valid.",
      });
    }

    // >>======= Fetch the Post by ID =======>
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userHasLiked = post.likes.includes(userId);

    //>>===based on the like unlike status===>>
    const updateOperation = userHasLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    await Post.updateOne({ _id: postId }, updateOperation);

    // >>==user's likedPosts array===>>
    const userUpdateOperation = userHasLiked
      ? { $pull: { likedPosts: postId } }
      : { $addToSet: { likedPosts: postId } };

    await User.updateOne({ _id: userId }, userUpdateOperation);

    //>>=== send notification of liked post===>>
    if (!userHasLiked) {
      const user = await User.findById(userId);
      const newNotification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
        content: `${user.username} liked your post.`,
      });
      await newNotification.save();
    }

    //>>===updated like count====>>
    const updatedLikeCount = userHasLiked
      ? post.likes.length - 1
      : post.likes.length + 1;

    return res.status(200).json({
      success: true,
      message: userHasLiked ? "Post Unliked!" : "Post Liked!",
      likesCount: updatedLikeCount,
    });
  } catch (error) {
    console.error("Error in likeUnlikePost:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>=========== get users liked posts ===========>>
export const getLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    //>>============Find user in Db==========>>
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User Not Found",
        message: "The specified user could not be found.",
      });
    }
  } catch (error) {}
};
