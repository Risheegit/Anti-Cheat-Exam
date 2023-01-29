import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Scorecard = () => {
	const [currentAccount, setCurrentAccount] = useState("")
	const [finalScore, setFinalScore] = useState(0)
	const [numberQuestions, setNumberQuestions] = useState(0)
	const [timeTaken, setTimeTaken] = useState(0)
	const [maxQuestions, setMaxQuestions] = useState(0)
	const [newScore, setNewScore] = useState(0)

	const location = useLocation()
	useEffect(() => {
		location.state.currentAccount &&
			setCurrentAccount(location.state.currentAccount)
		location.state.finalScore && setFinalScore(location.state.finalScore)
		location.state.numberQuestions &&
			setNumberQuestions(location.state.numberQuestions)
		location.state.timeTaken && setTimeTaken(location.state.timeTaken)
		location.state.maxQuestions &&
			setMaxQuestions(location.state.maxQuestions)
		location.state.currentScore && setNewScore(location.state.currentScore)
	}, [
		location.state.currentAccount,
		location.state.finalQuestions,
		location.state.numberQuestions,
		location.state.timeTaken,
		location.state.maxQuestions,
		location.state.currentScore,
	])

	return (
		<div className="bg-black  flex flex-col w-full justify-center h-screen items-center">
			<p className="text-white">{currentAccount}</p>
			<div className="bg-gray-600 md:3/12  w-4/12 backdrop-blur-lg rounded-lg items-start flex flex-col p-4 ">
				<h1 className=" flex flex-row text-center mx-auto text-white text-3xl p-4 ">
					Total score: {finalScore}
				</h1>
				<h1 className=" flex flex-row font-light text-white text-2xl p-4 pl-12 ">
					Score in this quiz: {newScore}
				</h1>
				<h1 className=" flex flex-row font-light text-white text-2xl p-4 pl-12 ">
					No of questions attempted: {maxQuestions}
				</h1>
				<h1 className=" flex flex-row font-light text-white text-2xl p-4 pl-12 ">
					Time taken (in seconds): {timeTaken / 1000}
				</h1>
				<h1 className=" flex flex-row font-light text-white text-2xl p-4 pl-12 ">
					Total no of questions attempted: {numberQuestions}
				</h1>
			</div>
		</div>
	)
}

export default Scorecard
