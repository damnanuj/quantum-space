import User from "../models/userModel.js";

// >>================get the user Profile Details==================================>>
export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    console.log(username);
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile Controller :", error.message);
    return res.status(500).json({
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
    // >>===== Prevent users from following/unfollowing themselves=======>>
    if (loggedUserId.toString() === targetUserId) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }

    // >>============= Find the authenticated user and the target user ===========>>
    const user = await User.findById(loggedUserId);
    const targetUser = await User.findById(targetUserId);

    // >>============== If the target user doesn't exist ============>>
    if (!targetUser) {
      return res
        .status(404)
        .json({ error: "The person you are trying to follow doesn't exist!" });
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

    // >>======= Return a success message with the status ===========>>
    const message = isFollowing
      ? "User unfollowed successfully"
      : "User followed successfully";
    return res.status(200).json({ message });
  } catch (error) {
    console.log("Error in followUnfollowUser Controller:", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
