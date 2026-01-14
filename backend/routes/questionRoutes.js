import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  generateQuestions,
  getHistoryByResume,
  getQuestionsByResume
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/generate", protect, generateQuestions);
router.get("/history", protect, getHistoryByResume);
router.get("/history/:resumeId", protect, getQuestionsByResume);

export default router;
