import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateQuestionsFromResume = async (resumeText, level) => {
  const prompt = `
SYSTEM:
You are a JSON API. You must return ONLY valid JSON.
Do not explain. Do not add text.

TASK:
Based strictly on the resume below, generate exactly 10 ${level}-level interview questions.

Resume content:
"""
${resumeText}
"""

Each item MUST contain:
- question
- idealAnswer
- basedOn (skill, project, or experience from resume)

Return ONLY this JSON format:
{
  "questions": [
    {
      "question": "",
      "idealAnswer": "",
      "basedOn": ""
    }
  ]
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a strict JSON generator." },
      { role: "user", content: prompt }
    ],
    temperature: 0.2
  });

  const content = response.choices[0].message.content.trim();

  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Groq response did not contain JSON");
    }
    return JSON.parse(jsonMatch[0]);
  }
};
