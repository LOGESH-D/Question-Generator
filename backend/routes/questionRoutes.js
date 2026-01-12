import express from "express";
import { generateQuestionsFromResume } from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateQuestionsFromResume);

export default router;
