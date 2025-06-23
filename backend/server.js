
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
//import cashFreeRoutes from './routes/cashFreeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import tripRoutes from './routes/tripRoutes.js'
import paymentRoutes from './routes/paymentRouter.js'

dotenv.config();

console.log("🔄 Connecting to database...");
await connectDB();
console.log("✅ Database connected!");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth/users", authRoutes);
//app.use("/api/cashfree-payments", cashFreeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
    console.log("MONGO_URI:", process.env.MONGO_URI);
});