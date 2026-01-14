import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateQuestionsFromResume = async (resumeText, level) => {
  const prompt = `
SYSTEM ROLE:
You are a senior technical interviewer at a product-based company.
You conduct realistic, in-depth technical interviews.

TASK:
Based STRICTLY on the resume content below, generate EXACTLY 10 ${level}-level
interview questions with ideal answers.

RESUME:
"""
${resumeText}
"""

INTERVIEW RULES (VERY IMPORTANT):
- Analyze the resume first to identify:
  - Technical skills
  - Projects
  - Internships / experience
  - Tools, technologies, and domains
- Generate questions ONLY from what exists in the resume
- Do NOT assume or introduce new skills
- Avoid generic or HR-style questions
- Questions must feel like real interview questions

QUESTION QUALITY:
- Ask "HOW", "WHY", and "WHAT IF" questions
- Prefer scenario-based and project-deep-dive questions
- Include debugging, design, and trade-off questions where applicable
- Questions should test:
  - Practical understanding
  - Decision-making
  - Real-world usage
  - Edge cases and limitations

DIFFICULTY HANDLING:
- easy → basic understanding and usage
- medium → internals, reasoning, and architecture
- hard → optimization, scalability, edge cases, and design trade-offs

ANSWER RULES:
- Ideal answers must be technical and specific
- Mention reasoning, approaches, and best practices
- Avoid vague or generic explanations

OUTPUT FORMAT (STRICT):
Return ONLY valid JSON. No explanations. No extra text.

{
  "questions": [
    {
      "question": "string",
      "idealAnswer": "string",
      "basedOn": "specific skill, project, or experience from resume"
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
