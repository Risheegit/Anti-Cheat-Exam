import QuestionModel from "../models/QuestionModel";
import { Request, Response } from "express";

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    console.log("IN controller");
    const questions = await QuestionModel.find();
    console.log(questions);
    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
  }
};

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = new QuestionModel(req.body);
    console.log("Reached controller");
    try {
      const savedQuestion = await newQuestion.save();
      res.status(200).json(savedQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    console.log(error);
  }
};
