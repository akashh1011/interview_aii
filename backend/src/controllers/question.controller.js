import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { Question } from "../models/questions.model.js";
import { generateQuestionsWithAnswers } from "../utils/openaiClient.util.js";

// Generate questions + answers
const generateInterviewQuestions = asyncHandler(async (req, res) => {
  const { topic, difficulty, count } = req.body;

  if (!topic || !difficulty || !count) {
    throw new ApiError(400, "Topic, difficulty, and count are required");
  }

  const questions = await generateQuestionsWithAnswers(topic, difficulty, count);

  const questionDoc = await Question.create({
    topic,
    difficulty,
    questions,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, questionDoc, "Questions & answers generated successfully"));
});

// Fetch questions by topic
const getQuestions = asyncHandler(async (req, res) => {
  const { topic } = req.query;

  const filter = topic ? { topic } : {};
  const questions = await Question.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Questions fetched successfully"));
});

export { generateInterviewQuestions, getQuestions };
