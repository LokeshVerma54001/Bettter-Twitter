import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", //  frontend origin
    credentials: true, // VERY IMPORTANT to allow cookies
}))

app.use('/api/auth', authRoutes);

app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
})