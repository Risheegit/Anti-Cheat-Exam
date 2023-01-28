import React, { useState, useEffect } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import { IQuestion } from "../pages/ViewAllQuestions"
import { ethers } from "ethers"
import { contractABI, contractAddress } from "../utils/constants"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

const StudentQuestion = () => {
	//Maybe form the questions here
	//Hard coding 10 questions
	const maxQuestions = 5
	const averageTimePerQuestion = 10
	let startingTime: number

	const navigate = useNavigate()
	const [startTime, setStartTime] = useState(0)
	const [questionsLeft, setQuestionsLeft] = useState(maxQuestions)
	// const [questionArray, setQuestionArray] = useState<IQuestion[] | null>([])
	const questionArray: IQuestion[] = []
	const [finalQuestions, setFinalQuestions] = useState<IFinalQuestion[]>([])

	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const ethereum = (window as any).ethereum

	const [questionObject, setQuestionObject] = useState<IQuestion | null>()
	const [options, setOptions] = useState([])
	const [correctOption, setCorrectOption] = useState("")
	const [isCorrect, setIsCorrect] = useState(false)
	const [sus, setSus] = useState(false)
	const [optionArray, setOptionArray] = useState<String[]>([])
	const [currentAccount, setCurrentAccount] = useState("")
	const [selectedOption, setSelectedOption] = useState(null)

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
			// console.log("Questions are ", questions)
			questions.map((question: IQuestion) => {
				questionArray.length < maxQuestions
					? questionArray.push(question)
					: questionArray
			})
			// console.log("Question array is ", questionArray)
		} catch (error) {
			console.log(error)
		}
	}

	const getAQuestion = (questionList: IQuestion[]) => {
		//We can start pulling specific questions
		return questionList[questionsLeft - 1]
	}

	//TO view changes in finalquestions
	// useEffect(() => {
	// 	// console.log("Final questions changed", finalQuestions)
	// 	// console.log("Length is ", finalQuestions.length)
	// }, [finalQuestions])

	const handleClick = () => {
		console.log("No of questions are : ", questionsLeft)

		questionsLeft > 1 ? setQuestionsLeft(questionsLeft - 1) : submit()
		// addQuestion({
		// 	address: currentAccount,
		// 	question: questionObject?.question,
		// 	isCorrect,
		// })
		// console.log("Current account is ", currentAccount)
		// console.log("Question is ", questionObject?.question)
		// console.log("Current state is ", isCorrect)
		finalQuestions.push({
			question: questionObject?.question,
			isCorrect,
		})
		// console.log(finalQuestions)
		setFinalQuestions([...finalQuestions])
	}

	const submit = async () => {
		// setQuestionsLeft(0)
		const endTime = new Date().getTime()
		const timeTaken = endTime - startTime
		timeTaken / 1000 < (averageTimePerQuestion * maxQuestions) / 10
			? setSus(true)
			: setSus(false)
		console.log("In submit", finalQuestions)
		await addFinal({
			address: currentAccount,
			finalQuestions: finalQuestions,
			timeTaken: timeTaken,
			sus: sus,
		})
		console.log("Current account before submit", currentAccount)
		await viewScore({ address: currentAccount })
		console.log(`You are ${sus} sus`)
		// navigate("/")
	}

	// currentAccount ? console.log(currentAccount) : ""
	const getEthereumContract = () => {
		const provider = new ethers.providers.Web3Provider(ethereum)
		const signer = provider.getSigner()
		const answersContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer
		)
		// console.log(answersContract)
		return answersContract
	}

	interface IFinalQuestion {
		question: string | undefined
		isCorrect: boolean
	}
	interface IFinal {
		address: string
		finalQuestions: IFinalQuestion[]
		timeTaken: number
		sus: boolean
	}

	const addFinal = async (props: IFinal) => {
		try {
			if (!ethereum) return alert("Please install metamask")
			const addressContract = getEthereumContract()
			const addressHash = await addressContract.addFinal(
				currentAccount,
				finalQuestions,
				props.timeTaken,
				props.sus
			)
			setIsLoading(true)
			console.log(`Loading - ${addressHash.hash}`)
			await addressHash.wait()
			setIsLoading(false)
			console.log(`Success - ${addressHash.hash}`)
		} catch (error) {
			console.log(error)
		}
	}

	interface IScoreProps {
		address: string
	}
	const viewScore = async (props: IScoreProps) => {
		try {
			if (!ethereum) return alert("Please install metamask")
			const addressContract = getEthereumContract()
			console.log(addressContract)
			// console.log("In view score", currentAccount)
			// console.log("Props.address ", props.address)
			const address = ethers.utils.getAddress(props.address)
			const score = await addressContract.viewScore(address)
			// console.log(address)
			setIsLoading(true)
			console.log("Your score is ", score)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const location = useLocation()
	useEffect(() => {
		location.state.currentAccount &&
			setCurrentAccount(location.state.currentAccount)
	}, [location.state.currentAccount])

	const handleRadioChange = async (e: any) => {
		setSelectedOption(e.target.value)
	}
	useEffect(() => {
		console.log(selectedOption)
		if (selectedOption) {
			selectedOption == correctOption
				? setIsCorrect(true)
				: setIsCorrect(false)
		}
	}, [selectedOption])

	useEffect(() => {
		console.log("QUetsions left are ", questionsLeft)
	}, [questionsLeft])

	return (
		<div className="bg-black  flex flex-col justify-center w-full h-screen items-center">
			{/* <Navbar onValueChange={setCurrentAccount} /> */}
			<p className="text-white">{currentAccount}</p>
			<div className="bg-gray-600  backdrop-blur-lg rounded-lg items-start flex flex-col p-4 ">
				<div className=" flex flex-row text-white text-3xl p-4 ">
					<p className="pr-2">
						Q
						{questionsLeft
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
						value={optionArray[0]?.toString()}
						onChange={handleRadioChange}
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
						value={optionArray[1]?.toString()}
						onChange={handleRadioChange}
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
						value={optionArray[2]?.toString()}
						onChange={handleRadioChange}
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
						value={optionArray[3]?.toString()}
						onChange={handleRadioChange}
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
						{questionsLeft - 1 ? "Next" : "Submit"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default StudentQuestion
