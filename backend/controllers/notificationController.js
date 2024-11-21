import Notification from "../models/notficationModel.js";

// >>=========== Get Notifications for the User =============>>
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    // >>============ Fetch Notifications ===========>>
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 }) // Sort by latest
      .populate({
        path: "from", // Populate details of the sender
        select: "username profilePicture",
      })
      .select("content type status from createdAt")
      .lean();

    // >>============ Mark Unread Notifications as Read ===========>>
    await Notification.updateMany(
      { to: userId, status: false },
      { status: true }
    );

    // >>============ Respond with Notifications ===========>>
    return res.status(200).json({
      success: true,
      message: "Fetched notifications successfully.",
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("Error in getNotifications Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

// >>=========== Delete Notifications for the User =============>>
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { notificationId } = req.params;

    // >>============ Single or Bulk Deletion ===========>>
    if (notificationId) {
      // >>== Delete a specific notification by ID ==>>
      const notification = await Notification.findOneAndDelete({
        _id: notificationId,
        to: userId,
      });

      // >>== Handle case if notification not found ==>>
      if (!notification) {
        return res.status(404).json({
          success: false,
          error: "Notification Not Found",
          message: "The specified notification could not be found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully.",
      });
    } else {
      // >>== Bulk Delete: Delete all notifications for the user ==>>
      await Notification.deleteMany({ to: userId });
      return res.status(200).json({
        success: true,
        message: "All notifications deleted successfully.",
      });
    }
  } catch (error) {
    console.error("Error in deleteNotifications Controller:", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};
