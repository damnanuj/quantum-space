import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import { connectMongoDb } from "./lib/db.js"



dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())  //json body parser

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, ()=>{
    console.log(`Quantom Server is Running on PORT : ${PORT}`);
    connectMongoDb()
})