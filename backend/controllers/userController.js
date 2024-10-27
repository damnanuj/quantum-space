import mongoose from "mongoose";
import User from "../models/userModel.js";
import Notification from "../models/notficationModel.js";
import { regexPatterns } from "../lib/utils/authUtill.js";

// >>================get the user Profile Details==================================>>
export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error in getUserProfile Controller :", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>================Follow/Unfollow a user==================================>>
export const followUnfollowUser = async (req, res) => {
  const { targetUserId } = req.params; // ID of the user to follow/unfollow
  const loggedUserId = req.user._id; // ID of the authenticated user

  try {
    // >>===== Validate if targetUserId is a valid ObjectId ======>>
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({
        success: false,
        message:
          "The provided user ID is not valid. Please check the ID and try again.",
      });
    }

    // >>===== Prevent users from following/unfollowing themselves=======>>
    if (loggedUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow/unfollow yourself",
      });
    }

    // >>============= Find the authenticated user and the target user ===========>>
    const user = await User.findById(loggedUserId).select("-password");
    const targetUser = await User.findById(targetUserId).select("-password");

    // >>============== If the target user doesn't exist ============>>
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "The person you are trying to follow doesn't exist!",
      });
    }

    // >>======= Checking if the authenticated user is already following the target user =========>>
    const isFollowing = user.following.includes(targetUser._id);

    if (isFollowing) {
      // >>====== Unfollow the user if already following ==========>>
      user.following.pull(targetUser._id);
      targetUser.followers.pull(user._id);
    } else {
      // >>========== Follow the user if not already following ===========>>
      user.following.push(targetUser._id);
      targetUser.followers.push(user._id);
    }

    // >>============ Save the changes to both user and target user ============>>
    await user.save();
    await targetUser.save();

    // >>============== Send the notification =====================>>
    const newNotification = new Notification({
      from: loggedUserId,
      to: targetUserId,
      type: "follow",
      content: `${user.username} has started following you.`,
    });
    await newNotification.save();

    // >>======= Return a success message with the status ===========>>
    const message = isFollowing
      ? "User unfollowed successfully"
      : "User followed successfully";

    return res.status(200).json({
      success: true,
      message,
      data: {
        user: loggedUserId,
        targetUser: targetUserId,
        isFollowing: !isFollowing,
      },
    });
  } catch (error) {
    console.log("Error in followUnfollowUser Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>================User Suggestions==================================>>
export const getSuggestedUsers = async (req, res) => {
  try {
    const loggedUserId = req.user._id; // ID of the authenticated user

    //>>=======list of users that the logged user is already following==========>>
    const userFollowedByMe = await User.findById(loggedUserId).select(
      "following"
    );
    const followingIds = userFollowedByMe.following.map((user) =>
      user.toString()
    );

    // >>==============To exclude myself from suggestions==========>>
    followingIds.push(loggedUserId.toString());

    // >>========Find users that the logged user is not following =====>>
    const suggestedUsers = await User.find({
      _id: { $nin: followingIds }, //>>=== exclude those userIds==>>
    })
      .select("name username profilePicture about") // Include only necessary fields
      .limit(10); //10 results

    // >>=======Final suggestions data==========>>
    res.status(200).json({
      success: true,
      data: suggestedUsers,
      message: "User suggestions fetched successfully",
    });
  } catch (error) {
    console.log("Error in userSuggestions Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>================Update User Profile==================================>>
export const updateUserProfile = async (req, res) => {
  const loggedUserId = req.user._id; // ID of the authenticated user
  const {
    name,
    username,
    email,
    gender,
    location,
    about,
    education,
    profilePicture,
    coverPicture,
    isPrivate,
    website,
    currentPassword,
    newPassword,
  } = req.body;

  try {
    // >>===== Validate user ID ======>>
    if (!mongoose.Types.ObjectId.isValid(loggedUserId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid User ID",
        message: "The provided user ID is not valid.",
      });
    }

    // >>===== Check if the username or email already exists for another user ======>>
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: loggedUserId },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Conflict",
        message:
          "Username or email is already in use. Please use a different one.",
      });
    }

    // >>===== Prepare the fields to update ======>>
    const updatedFields = {
      ...(name && { name }),
      ...(username && { username }),
      ...(email && { email }),
      ...(gender && { gender }),
      ...(location && { location }),
      ...(about && { about }),
      ...(Array.isArray(education) && { education }),
      ...(profilePicture && { profilePicture }),
      ...(coverPicture && { coverPicture }),
      ...(typeof isPrivate === "boolean" && { isPrivate }),
      ...(website && { website }),
    };

    // >>===== Check for password update ======>>
    if (newPassword) {
      // Retrieve the user from the database
      const user = await User.findById(loggedUserId);
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: "Invalid Credentials",
          message: "Current password is incorrect. Please try again.",
        });
      }

      // Hash the new password and add it to the updated fields
      updatedFields.password = await bcrypt.hash(newPassword, 10);
    }

    // >>===== Update the user profile ======>>
    const updatedUser = await User.findByIdAndUpdate(
      loggedUserId,
      { $set: updatedFields },
      { new: true, runValidators: true } // return the updated document
    ).select("-password"); // Exclude password field from response

    // >>===== Send success response with updated user data ======>>
    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.log("Error in updateUserProfile Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};
