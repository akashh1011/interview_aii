import OpenAI from "openai";
import { ApiError } from "./ApiError.util.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateQuestionsWithAnswers = async (topic, difficulty, count) => {
  try {
    const prompt = `
    Generate ${count} ${difficulty}-level interview questions on ${topic}.
    For each question, include a short, clear answer.
    Return the response strictly in this JSON format:
    [
      {"question": "string", "answer": "string"},
      ...
    ]
    Example:
    [
      {"question": "What is a stack?", "answer": "A stack is a LIFO data structure."}
    ]
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content?.trim();
    const questions = JSON.parse(content);
    if (!Array.isArray(questions)) {
      throw new ApiError(500, "Invalid AI response format");
    }

    return questions;
  } catch (error) {
    throw new ApiError(500, "Failed to generate questions with answers", error);
  }
};

export { generateQuestionsWithAnswers };
