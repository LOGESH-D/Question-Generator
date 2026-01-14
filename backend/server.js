import "./config/env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import questionRoutes from "./routes/questionRoutes.js";



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.originalUrl);
  next();
});
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "JWT working",
    userId: req.user.id
  });
});
app.use("/api/questions", questionRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
