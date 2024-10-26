import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["quantum-space"];
    //>>=========== Check if token is available======>>
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: Please login first",
      });
    }
    //>>==========decode & Verify the token==========>>
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
      return res.status(401).json({
        error: "Unauthorized: Invalid token",
      });
    }
    //>>====== Find user by (userId) stored in token and exclude the password
    const user = await User.findById(decodeToken.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    //====== Attach the user to the request object========>>
    req.user = user;
    //=== Call next middleware======>>
    next();
  } catch (error) {
    console.log("Error in protectRoute Code:", error.message);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
