import mongoose from "mongoose";
import { Schema, model } from "mongoose";

interface IQuestion {
  _id?: unknown;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  __v?: unknown;
}
const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  option1: {
    type: String,
  },
  option2: {
    type: String,
  },
  option3: {
    type: String,
  },
  option4: {
    type: String,
  },
  correctOption: {
    type: String,
  },
});

const QuestionModel = model<IQuestion>("QuestionModel", questionSchema);

export default QuestionModel;
