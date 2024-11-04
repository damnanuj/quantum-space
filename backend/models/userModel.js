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
      lowercase: true, // lowercase usernames
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
    gender: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        default: "Unknown",
      },
      state: {
        type: String,
        default: "Unknown",
      },
      country: {
        type: String,
        default: "Earth",
      },
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "Explorer of Quantum Space.",
      maxlength: 500,
    },
    education: [
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
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
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
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    website: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
