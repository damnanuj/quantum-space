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
      enum: ["male", "female"],
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

/*>>== Middleware to set 
default profilePicture and coverPicture 
based on gender ===>>*/

userSchema.pre("save", function (next) {
  if (this.isNew) {
    // Set default profile picture based on gender
    if (this.gender === "female" && !this.profilePicture) {
      this.profilePicture =
        "https://cdn-icons-png.freepik.com/512/1912/1912051.png?ga=GA1.1.697858611.1715864602";
    } else if (this.gender === "male" && !this.profilePicture) {
      this.profilePicture =
        "https://cdn-icons-png.freepik.com/512/1912/1912097.png?ga=GA1.1.697858611.1715864602";
    }

    if (!this.coverPicture) {
      this.coverPicture =
        "https://i0.wp.com/nftartwithlauren.com/wp-content/uploads/2024/01/laurenmcdonaghpereiraphoto_A_beach_sunset_with_a_horseback_ri_db01a57e-5be8-4887-9d40-80528f1d2ca4_1.png?fit=1024%2C574&ssl=1";
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
