import React, { useState, useEffect } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { IQuestion } from "../pages/ViewAllQuestions"

const StudentQuestion = () => {
	//Maybe form the questions here
	//Hard coding 10 questions
	const maxQuestions = 3
	const averageTimePerQuestion = 10
	let startingTime: number
	const [startTime, setStartTime] = useState(0)
	const [questionsLeft, setQuestionsLeft] = useState(maxQuestions)
	// const [questionArray, setQuestionArray] = useState<IQuestion[] | null>([])
	const questionArray: IQuestion[] = []

	const [questionObject, setQuestionObject] = useState<IQuestion | null>()
	const [options, setOptions] = useState([])
	const [correctOption, setCorrectOption] = useState("")
	const [sus, setSus] = useState(false)
	const [optionArray, setOptionArray] = useState<String[]>([])

	useEffect(() => {
		const loadData = async () => {
			// const questionObject = await loadAndGetQuestion()
			await loadQuestions()
			if (questionArray.length > 0) {
				// console.log(getAQuestion(questionArray))
				const {
					question,
					option1,
					option2,
					option3,
					option4,
					correctOption,
				} = getAQuestion(questionArray)
				const questionObject = {
					question,
					correctOption,
					option1,
					option2,
					option3,
					option4,
				}
				setCorrectOption(correctOption)
				//Randomise the options
				optionArray.length = 0
				optionArray.push(option1, option2, option3, option4)
				optionArray.sort(() => Math.random() - 0.5)
				setQuestionObject(questionObject)
				if (questionsLeft === maxQuestions) {
					startingTime = new Date().getTime()
					console.log("Starting time is", startingTime)
					if (startingTime) {
						setStartTime(startingTime)
					}
				}
				// setQuestionsLeft(questionsLeft - 1)
			}
		}
		loadData()
	}, [questionsLeft])

	//Loads all the questions
	const loadQuestions = async () => {
		try {
			const { data: dataList } = await axios.get(
				"http://localhost:5000/api/question/"
			)
			//To randomize the order
			dataList.sort(() => Math.random() - 0.5)
			const questions = await dataList.slice(0, questionsLeft)
			// //Now we have a list of random questions an we want only desired no of questions
			// setQuestionArray(dataList.slice(0, questionsLeft))
			console.log("Questions are ", questions)
			questions.map((question: IQuestion) => {
				questionArray.length < maxQuestions
					? questionArray.push(question)
					: questionArray
			})
			console.log("Question array is ", questionArray)
		} catch (error) {
			console.log(error)
		}
	}

	const getAQuestion = (questionList: IQuestion[]) => {
		//We can start pulling specific questions
		return questionList[questionsLeft - 1]
	}

	const handleClick = () => {
		console.log(questionsLeft)

		questionsLeft > 0 ? setQuestionsLeft(questionsLeft - 1) : submit()
	}

	const submit = () => {
		setQuestionsLeft(0)
		const endTime = new Date().getTime()
		const timeTaken = endTime - startTime
		timeTaken / 1000 < averageTimePerQuestion * maxQuestions
			? setSus(true)
			: setSus(false)
		// console.log(`You are ${sus} sus`)
	}

	// async function loadAndGetQuestion() {
	// 	const { question, correctOption, option1, option2, option3, option4 } =
	// 		getAQuestion(questionArray)
	// 	const questionObject = {
	// 		question,
	// 		correctOption,
	// 		option1,
	// 		option2,
	// 		option3,
	// 		option4,
	// 	}
	// 	return questionObject
	//}

	return (
		<div className="bg-black flex flex-col w-full h-screen items-center">
			<Navbar />
			<div className="bg-gray-600 rounded-lg items-start flex flex-col p-4 ">
				<div className=" flex flex-rpw text-white text-3xl p-4 ">
					<p className="pr-2">
						Q
						{maxQuestions - questionsLeft + 1 > 0
							? maxQuestions - questionsLeft + 1
							: maxQuestions}
						.
					</p>
					{questionObject?.question}
				</div>
				{/* 1st option */}
				<label className="text-white text-xl font-light p-2 flex">
					<input
						type="radio"
						name="group1"
						onChange={() => {}}
						required
						className="mx-4 mb-1 mt-1 p-2 border-none rounded"
					/>
					{optionArray[0]}
				</label>
				{/* 2nd OPtion */}
				<label className="text-white text-xl font-light p-2 flex">
					<input
						type="radio"
						name="group1"
						onChange={() => {}}
						required
						className="mx-4 mb-1 mt-1 p-2 border-none rounded-full"
					/>
					{optionArray[1]}
				</label>
				{/* 3rd option */}
				<label className="text-white font-light text-xl p-2 flex">
					<input
						type="radio"
						name="group1"
						onChange={() => {}}
						required
						className="mx-4 mb-1 mt-1 p-2 border-none rounded"
					/>
					{optionArray[2]}
				</label>
				{/* 4th option */}
				<label className="text-white font-light text-xl p-2 flex">
					<input
						type="radio"
						name="group1"
						onChange={() => {}}
						required
						className="mx-4 mb-1 mt-1 p-2 border-none rounded"
					/>
					{optionArray[3]}
				</label>
				{/* Button */}
				<div className="flex ml-auto items-center justify-end">
					<button
						type="submit"
						className="rounded bg-gray-500 text-xl text-white py-2 px-4 mt-3 mr-6"
						onClick={handleClick}
					>
						{questionsLeft ? "Next" : "Submit"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default StudentQuestion
