// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Answers {

    //I want each student to have id (address), their score and th elist of questions and if hey were right/wrong
    struct Question {
        string question;
        bool isCorrect;
    }

    struct Student {
        uint score;
        Question[] questions;
    }

    mapping(address => Student) public students;

    function addQuestionAttempted(address student, Question memory question) public {
        //Here we can change the value of each questio eg +3/-1 or +1/0
        question.isCorrect ? students[student].score ++ : students[student].score;
        students[student].questions.push(question);
    }

    function viewScore (address student) public view returns (uint) {
        return(students[student].score);
    }

    function noOfQuestions (address student) public view returns (uint) {
        return(students[student].questions.length);
    }

}