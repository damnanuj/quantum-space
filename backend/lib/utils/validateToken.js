import jwt from "jsonwebtoken";

//====================Validate Token==========================>>
export const validateToken = (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies["quantum-space"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided, please login" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    // Handle specific JWT errors if needed (e.g., token expired or invalid)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false, 
        message: "Token expired, please login again" 
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token, please login again" 
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "An error occurred, please login again",
      });
    }
  }
};
