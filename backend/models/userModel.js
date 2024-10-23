import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, //  lowercase usernames
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bannerImage: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "Quantum Space User",
      maxlength: 100,
    },
    location: {
      type: String,
      default: "Earth",
    },
    about: {
      type: String,
      default: "Explorer of Quantum Space.",
      maxlength: 500,
    },
    education: [
      //education details
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          default: "",
        },
        fieldOfStudy: {
          type: String,
          default: "",
        },
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
        current: {
          type: Boolean,
          default: false,
        },
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // user IDs following this user
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], //user IDs this user is following
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ], // post IDs created by this user
    verified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ["Active", "Suspended", "Deactivated"],
      default: "Active",
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"], //permissions
      default: "user",
    },
    isPrivate: {
      type: Boolean,
      default: false, // Privacy setting for the account
    },
    website: {
      type: String,
      default: "", // websites or portfolios links
    },
    lastLogin: {
      type: Date, //last login time
    },
    notifications: {
      type: Array, // Array of notifications
      default: [],
    },
    resetPasswordToken: {
      type: String, //password reset functionality
    },
    resetPasswordExpires: {
      type: Date, // Expiration for reset token
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
