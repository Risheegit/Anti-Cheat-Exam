import axios from "axios"
import React from "react"
import { useState, useEffect } from "react"
import Question from "../components/Question"
//Add view, delete and update function here

export interface IQuestion {
	_id?: unknown
	question: string
	option1: string
	option2: string
	option3: string
	option4: string
	correctOption: string
	__v?: unknown
}
const ViewQuestions = () => {
	const [questionObject, setQuestionObject] = useState<IQuestion[]>([])

	// const getQuestions = async () => {
	// 	console.log("In view questions")
	// 	const { data: dataList } = await axios.get(
	// 		"http://localhost:5000/api/question/"
	// 	)
	// }

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/question"
				)
				setQuestionObject(response.data)
				console.log("Resposne.data is ", response.data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchQuestions()
	}, [])

	const firstObject = questionObject[0]

	return (
		<div>
			<div>
				{questionObject.map((question) => (
					<Question question={question} />
				))}
			</div>
		</div>
	)
}

export default ViewQuestions
