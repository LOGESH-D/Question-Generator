import QuestionSet from "../models/QuestionSet.js";
import Resume from "../models/Resume.js";
import { generateQuestionsFromResume } from "../utils/aiServices.js";

export const generateQuestions = async (req, res) => {
  try {
    const { resumeId, level } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumeText = resume.resumeText;

    if (typeof resumeText !== "string" || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Resume text is missing or unreadable. Please re-upload the resume."
      });
    }

    const aiResult = await generateQuestionsFromResume(
      resumeText,
      level
    );

    const questionSet = await QuestionSet.create({
      userId: req.user.id,
      resumeId,
      level,
      questions: aiResult.questions
    });

    res.json({
      message: "Questions generated successfully",
      questions: questionSet.questions,
      questionSetId: questionSet._id
    });

  } catch (error) {
    console.error("Question generation error:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};

export const getHistoryByResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const resumes = await Resume.find({ userId })
      .select("fileName uploadedAt");

    const history = await Promise.all(
      resumes.map(async (resume) => {
        const count = await QuestionSet.countDocuments({
          userId,
          resumeId: resume._id
        });

        return {
          resumeId: resume._id,
          fileName: resume.fileName,
          uploadedAt: resume.uploadedAt,
          questionSets: count
        };
      })
    );

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to load history" });
  }
};

export const getQuestionsByResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const data = await QuestionSet.find({
      userId: req.user.id,
      resumeId
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load questions" });
  }
};
