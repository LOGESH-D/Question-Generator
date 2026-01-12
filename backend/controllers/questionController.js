import Resume from "../models/Resume.js";
import QuestionSet from "../models/QuestionSet.js";
import { generateQuestions } from "../utils/ai.js";

export const generateQuestionsFromResume = async (req, res) => {
  try {
    const { resumeId, level } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const questions = await generateQuestions(resume.resumeText, level);

    const questionSet = await QuestionSet.create({
      userId: req.user.id,
      resumeId: resume._id,
      level,
      questions
    });

    res.json(questionSet);
  } catch (error) {
    res.status(500).json({ message: "Question generation failed" });
  }
};
