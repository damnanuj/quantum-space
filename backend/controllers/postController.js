import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/postModel.js";
import User from "../models/userModel.js";

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
    // >>==== Validate the post ID =====>>
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid post ID",
        message: "The provided post ID is not valid.",
      });
    }

    // >>==== Find the post by ID =====>>
    const post = await Post.findById(req.params.id);
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
    const postId = req.params.id;

    // >>==== Validate the post ID =====>>
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
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
