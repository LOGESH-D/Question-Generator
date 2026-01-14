import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "./aiPrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuestionsFromResume = async (resumeText, level) => {
  const prompt = buildPrompt(resumeText, level);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return JSON.parse(response);
};
