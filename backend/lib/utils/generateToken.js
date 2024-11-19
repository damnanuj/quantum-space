import jwt from "jsonwebtoken";

//>>====== Function to generate token and set cookie=====>>
export const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role, username: user.username }, 
    process.env.JWT_SECRET, 
    { expiresIn: "3d" }
  );


  // Set the cookie with the token
  res.cookie("quantum-space", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    // sameSite: "strict",
    // secure: process.env.NODE_ENV === "production", // Set 'secure' in production
  });
};
