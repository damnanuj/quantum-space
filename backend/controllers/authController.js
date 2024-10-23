import User from "../models/userModel.js";

export const signupController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    //>>====== all fields check=====>>
    if ((!name, !username, !email, !password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //>>====== existing email check=====>>
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    //>>====== existing username check========>>
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    //>>====== password length check========>>
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 charaters",
      });
    }
    const user = new User({
      name,
      username,
      email,
      password,
    });
    await user.save();

    return res.status(200).json({
      message: "User Registerd Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const loginController = (req, res) => {
  res.send("Login");
};
export const logoutController = (req, res) => {
  res.send("Logout");
};
