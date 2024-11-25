import User from "../models/userModel.js";

import bcrypt from "bcryptjs";

import { userDataValidation } from "../lib/utils/authUtill.js";
import { generateToken } from "../lib/utils/generateToken.js";

//=======================signup Controller==============================
export const signupController = async (req, res) => {
  try {
    const { name, username, email, gender, password } = req.body;

    // >>=============Validating Data from reqBody=========>>
    try {
      await userDataValidation({ name, username, email, password });
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError.message,
      });
    }

    //>>=======already existing email or username check=====>>
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const errorField = existingUser.email === email ? "Email" : "Username";
      return res.status(400).json({
        success: false,
        message: `${errorField} already exists`,
      });
    }

    //>>===============Hash the password============>>
    const salt = await bcrypt.genSalt(Number(process.env.SALT)); // Parse SALT if it's a number
    const hashedPassword = await bcrypt.hash(password, salt);

    //>>============Create and save user==============>>
    const user = new User({
      name,
      username,
      email,
      gender,
      password: hashedPassword,
    });

    await user.save();
    //========= Generate token after saving user ======>>

    const token = generateToken(user);

    // =====return final response json=====>>
    return res.status(201).json({
      success: true,
      token: token,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.log("Error in Signup Controller :", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

//====================Login Controller==============================
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //>>====== all fields check=====>>
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing user credentials",
      });
    }

    //>>====== email verify in database =====>>
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //>>====== password verify========>>
    const isPassMatched = await bcrypt.compare(password, user?.password || "");
    //=== bcrypt.compare to check the hashed password==>
    if (!isPassMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password", // Single error message for both cases
      });
    }
    user.password = undefined;
    //>>==== generate token  =======>
    const token = generateToken(user);

    //>>====Final Login success response========>>
    return res.status(200).json({
      success: true,
      token: token,
      message: `Welcome back ${user.name}`,
      data: user,
    });
  } catch (error) {
    console.log("Error in Login Controller :", error.message);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

//====================Logout Controller==========================>>
export const logoutController = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Error in logoutController:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging out.",
      error: error.message,
    });
  }
};
