import Resume from "../models/Resume.js";
import QuestionSet from "../models/QuestionSet.js";
import { generateQuestionsFromResume } from "../utils/aiServices.js";

export const generateQuestions = async (req, res) => {
  try {
    const { resumeId, level } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const questions = await generateQuestionsFromResume(
      resume.resumeText,
      level
    );

    const questionSet = await QuestionSet.create({
      userId: req.user.id,
      resumeId,
      level,
      questions
    });

    res.status(201).json(questionSet);
  } catch (error) {
    console.error("Question generation error:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};
