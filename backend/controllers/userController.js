import mongoose from "mongoose";
import User from "../models/userModel.js";
import Notification from "../models/notficationModel.js";
import { regexPatterns } from "../lib/utils/authUtill.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

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
    city,
    state,
    country,
    about,
    education,
    profilePicture,
    coverPicture,
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

    // >>===== Find the authenticated user in the database ======>>
    const user = await User.findById(loggedUserId);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "The specified user could not be found.",
        message: "User Not Found" ,
      });
    }

    // >>===== Specific Checks for Username and Email Conflicts ======>>
    if (username) {
      const existingUserByUsername = await User.findOne({
        username,
        _id: { $ne: loggedUserId },
      });
      if (existingUserByUsername) {
        return res.status(400).json({
          success: false,
          error: "Conflict",
          message: "Username is already in use. Please choose another.",
        });
      }
    }

    if (email) {
      const existingUserByEmail = await User.findOne({
        email,
        _id: { $ne: loggedUserId },
      });
      if (existingUserByEmail) {
        return res.status(400).json({
          success: false,
          error: "Conflict",
          message: "Email is already in use. Please choose another.",
        });
      }
    }

    // >>===== Regex Validation for Fields ======>>
    if (name && !regexPatterns.name.test(name)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Name should contain only letters and spaces.",
      });
    }
    if (username && !regexPatterns.username.test(username)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Username should be alphanumeric, 3-15 characters.",
      });
    }
    if (email && !regexPatterns.email.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Please provide a valid email address.",
      });
    }

    // >>===== Gender Validation ======>>
    if (gender && !["male", "female"].includes(gender.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: "Gender must be either 'male' or 'female'.",
      });
    }

    // >>=============For storing the Images ======================>>
    if (profilePicture) {
      const uploadedProfileResponse = await cloudinary.uploader.upload(
        profilePicture
      );
      const newProfilePictureUrl = uploadedProfileResponse.secure_url;

      //>>==successfully upload img then destry=====>>
      if (user.profilePicture) {
        await cloudinary.uploader.destroy(
          user.profilePicture.split("/").pop().split(".")[0]
        );
      }
      user.profilePicture = newProfilePictureUrl;
    }

    if (coverPicture) {
      const uploadedCoverResponse = await cloudinary.uploader.upload(
        coverPicture
      );
      const newCoverPictureUrl = uploadedCoverResponse.secure_url;
      //>>==successfully upload img then destry=====>>
      if (user.coverPicture) {
        await cloudinary.uploader.destroy(
          user.coverPicture.split("/").pop().split(".")[0]
        );
      }
      user.coverPicture = newCoverPictureUrl;
    }

    // >>===== Update the fields provided in the request ======>>
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (city) user.location.city = city;
    if (state) user.location.state = state;
    if (country) user.location.country = country;
    if (about) user.about = about;
    if (education) user.education = education;
    if (website) user.website = website;

    // >>============== Check for complete password update data =============>>
    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
        message:
          "Both current password and new password are required to update the password.",
      });
    }

    // >>=================== Password update section =======================>>
    if (currentPassword && newPassword) {
      if (!regexPatterns.password.test(newPassword)) {
        return res.status(400).json({
          success: false,
          error: "Invalid Credentials",
          message:
            "New password must be at least 6 characters long and include both uppercase and lowercase letters.",
        });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: "Invalid Credentials",
          message: "Current password is incorrect. Please try again.",
        });
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const newHashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = newHashedPassword;
    }

    // >>======= Save the updated user to the database =======>
    const updatedUser = await user.save();

    const updatedUserData = updatedUser.toObject();
    delete updatedUserData.password;

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      data: updatedUserData,
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
