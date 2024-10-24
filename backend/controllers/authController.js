import User from "../models/userModel.js";
import { userDataValidation } from "../lib/utils/authUtill.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

//=======================signup Controller==============================
export const signupController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // >>=============Validating Data from reqBody=========>>
    try {
      await userDataValidation({ name, username, email, password });
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    //>>=======already existing email or username check=====>>
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const errorField = existingUser.email === email ? "Email" : "Username";
      return res.status(400).json({ message: `${errorField} already exists` });
    }

    //>>===============Hash the password============>>
    const salt = await bcrypt.genSalt(Number(process.env.SALT)); // Parse SALT if it's a number
    const hashedPassword = await bcrypt.hash(password, salt);

    //>>============Create and save user==============>>
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    //========= Generate token and set cookie after saving user ======>>
    try {
      generateTokenAndSetCookie(user, res);
    } catch (tokenError) {
      console.error("Token generation failed:", tokenError.message);
      return res.status(201).json({
        message: "User registered successfully. Please log in manually.",
        error: tokenError.message,
      });
    }
    // =====return final response json=====>>
    return res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log("Error in Signup Controller :", error.message);
    return res.status(500).json({
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
        message: "Missing user credentials",
      });
    }

    //>>====== email verify in database =====>>
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //>>====== password verify========>>
    const isPassMatched = await bcrypt.compare(password, user?.password || "");
    //=== bcrypt.compare to check the hashed password==>
    if (!isPassMatched) {
      return res.status(400).json({
        message: "Invalid email or password", // Single error message for both cases
      });
    }

    //>>==== generate token and set cookie =======>
    generateTokenAndSetCookie(user, res);

    //>>====Final Login success response========>>
    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Error in Login Controller :", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

//====================logout Controller==========================>>
export const logoutController = (req, res) => {
  //=====Clear the authentication cookie=====>
  res.clearCookie("quantom-space", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  // Send response
  return res.status(200).json({ message: "Logged out successfully" });
};
