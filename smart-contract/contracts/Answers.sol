// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Answers {

    //I want each student to have id (address), their score and th elist of questions and if hey were right/wrong
    struct Question {
        string question;
        bool isCorrect;
        bool isBlank;
    }

    struct Student {
        uint score;
        uint blankQuestions;
        uint timeTaken;
        bool sus;
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

    // function noOfQuestionsAttempted (address student ) public view returns (uint) {
    // for (uint i = 0; i < students[student].questions.length; i++) {
    //     students[student].questions.isBlank ? students[student].blankQuestions++ : students[student].blankQuestions;
    //     }
    //     return(students[student].questions.blankQuestions);
    // }

    function addTime (address student, uint timeTaken, bool sus) public {
        students[student].timeTaken = timeTaken;
        students[student].sus = sus;
    }

    function checkStatus (address student) public view returns (bool){
        return (students[student].sus);
    }

    function addFinal (address student, Question[] memory questions, uint timeTaken, bool sus) public {
        for (uint i = 0; i < questions.length; i++) {
        Question memory question = questions[i];
        question.isCorrect ? students[student].score++ : students[student].score;
        students[student].questions.push(question);
        }
        students[student].timeTaken = timeTaken;
        students[student].sus = sus;
    
    }

}