import {Router} from "express"
import { generateInterviewQuestions, getQuestions } from "../controllers/question.controller.js"
const router = Router()

router.post("/generate", generateInterviewQuestions);
router.get("/all", getQuestions);

export default router;
