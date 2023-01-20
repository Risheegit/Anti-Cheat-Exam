import axios from "axios";
import React from "react";
//Add view, delete and update function here

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
const ViewQuestions = () => {
  const getQuestions = async () => {
    console.log("In view questions");
    const { data: dataList } = await axios.get(
      "http://localhost:5000/api/question/"
    );
    // const { question, option1, option2, option3, option4, correctOption } =
    //   dataList;
    dataList.map((data: IQuestion) => {
      console.log("Data is ", data);
      console.log(data);
      const { question, option1, option2, option3, option4, correctOption } =
        data;
      questionList.push(data);
      console.log(question, option1, option2, option3, option4, correctOption);
    });
    // console.log("Questions in fn are", question);
    return dataList;
  };
  //Maybe try adding a question component wit props as the data
  const questions = getQuestions();
  const questionList: IQuestion[] = [];
  console.log("QuestionList is ", questionList);

  return (
    <div>
      <h1>The questions are </h1>
      <div>{`${questionList}`}</div>
    </div>
  );
};

export default ViewQuestions;
