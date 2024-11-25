import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

// >>============File Imports=========>>
import authRoutes from "./routes/authRoute.js";
import homeRoutes from "./routes/homeRoute.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import { connectMongoDb } from "./db/connectMongoDb.js";

dotenv.config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://quantum-space-damnanuj.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());

const PORT = process.env.PORT || 8000;

app.use(express.json()); //json body parser
app.use(cookieParser()); //cookie parser
app.use(express.urlencoded({ extended: true })); //data parser from form

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/", homeRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Quantum Server is Running on http://localhost:${PORT}`);
  connectMongoDb();
});
