import React from "react"
import { IQuestion } from "../pages/ViewAllQuestions"

const Question = ({ question }: { question: IQuestion }) => {
	return (
		<div className="bg-black flex flex-col w-full items-center p-4">
			{/* Make responsive */}
			<div className="bg-gray-600 rounded-lg w-5/12 items-start flex flex-col p-4 ">
				<h2 className="mx-auto text-white text-3xl p-4 ">
					{question.question.endsWith("?")
						? question.question
						: question.question + " ?"}
				</h2>
				<p className="text-white text-xl font-light p-2 flex">
					Correct Option: {question.correctOption}
				</p>
				{/* Making a flex row for options */}
				<div className="flex flex-row">
					<p className="text-white text-xl font-light p-2 flex">
						The options are:
					</p>
					<ul>
						<li className="text-white text-xl font-light p-2 flex">
							<p className="pr-2">a. </p>
							{question.option1}
						</li>
						<li className="text-white text-xl font-light p-2 flex">
							<p className="pr-2">b. </p>
							{question.option2}
						</li>
						<li className="text-white text-xl font-light p-2 flex">
							<p className="pr-2">c. </p>
							{question.option3}
						</li>
						<li className="text-white text-xl font-light p-2 flex">
							<p className="pr-2">d. </p>
							{question.option4}
						</li>
					</ul>
				</div>
				<br></br>
			</div>
		</div>
	)
}

export default Question
