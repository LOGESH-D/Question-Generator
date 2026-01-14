export const buildPrompt = (resumeText, level) => {
  return `
You are an interview question generator.

STRICT RULES (DO NOT BREAK):
1. Use ONLY the information present in the resume.
2. Do NOT add new skills, tools, or technologies.
3. If something is not mentioned in the resume, do NOT ask about it.
4. Questions and answers must be strictly derived from resume content.
5. Generate exactly 10 questions.
6. Difficulty level: ${level}

Resume Content:
${resumeText}

Return ONLY valid JSON in this format:
[
  {
    "question": "",
    "idealAnswer": "",
    "basedOn": "skill/project/experience from resume"
  }
]
`;
};
