import { getAllQuestions, addQuestion } from "../controllers/question";
import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/", getAllQuestions);
router.post("/", addQuestion);

export default router;
