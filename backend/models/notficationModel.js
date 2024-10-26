import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    status: {
      type: Boolean,
      default: false, // false == "unread," true == "read"
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
