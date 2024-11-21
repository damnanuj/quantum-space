import jwt from "jsonwebtoken";

//>>====== Function to generate token and set cookie=====>>

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
};
