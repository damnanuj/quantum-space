import mongoose from "mongoose";
import User from "./backend/models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateUserPictures() {
  try {
   
    await User.updateMany(
      { gender: "female", profilePicture: "" },
      { $set: { profilePicture: "https://cdn-icons-png.freepik.com/512/1912/1912051.png?ga=GA1.1.697858611.1715864602" } }
    );

    await User.updateMany(
      { gender: "female", coverPicture: "" },
      { $set: { coverPicture: "https://i0.wp.com/nftartwithlauren.com/wp-content/uploads/2024/01/laurenmcdonaghpereiraphoto_A_beach_sunset_with_a_horseback_ri_db01a57e-5be8-4887-9d40-80528f1d2ca4_1.png?fit=1024%2C574&ssl=1" } }
    );

    
    await User.updateMany(
      { gender: "male", profilePicture: "" },
      { $set: { profilePicture: "https://cdn-icons-png.freepik.com/512/1912/1912097.png?ga=GA1.1.697858611.1715864602" } }
    );

    await User.updateMany(
      { gender: "male", coverPicture: "" },
      { $set: { coverPicture: "https://i0.wp.com/nftartwithlauren.com/wp-content/uploads/2024/01/laurenmcdonaghpereiraphoto_A_beach_sunset_with_a_horseback_ri_db01a57e-5be8-4887-9d40-80528f1d2ca4_1.png?fit=1024%2C574&ssl=1" } }
    );

    console.log("User profile and cover pictures updated successfully.");
  } catch (error) {
    console.log("Error updating user pictures:", error);
  } finally {
    mongoose.connection.close();
  }
}

updateUserPictures();
