//Here the examiners view should be written
//Add auth
//Add question, 4 options and correct correct
//Make a button to add another

import React, { ReactElement, useState, ChangeEvent } from "react"
import { BsCheck2 } from "react-icons/bs"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Examiner = () => {
	const [question, setQuestion] = useState("")
	const [option1, setOption1] = useState("")
	const [option2, setOption2] = useState("")
	const [option3, setOption3] = useState("")
	const [option4, setOption4] = useState("")
	const [correctOption, setCorrectOption] = useState("")

	const navigate = useNavigate()

	//When the correct option is entered the corresponding box should glow

	const handleSubmit = async (e: any) => {
		console.log("Reached handle submit")
		e.preventDefault()
		try {
			const data = {
				question,
				option1,
				option2,
				option3,
				option4,
				correctOption,
			}
			console.log(data)
			await axios.post("http://localhost:5000/api/question/", data)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="bg-black flex flex-col w-full h-screen justify-center items-center p-4">
			<div className="bg-gray-600 rounded-lg items-center flex flex-col p-4 ">
				<p className="text-white text-3xl p-4 ">Add Question</p>
				<form className="flex flex-col">
					{/* Making the question  */}
					<label className="text-white text-2xl p-2">
						Question:
						<textarea
							rows={4}
							value={question}
							placeholder="Add you question here..."
							onChange={(e) => setQuestion(e.target.value)}
							required
							className="text-black font-normal m-4 ml-0 p-2 border-none rounded outline-none mb-4 w-full text-sm"
						/>
					</label>
					{/* Making the options */}
					<label className="text-white text-2xl p-2 flex ">
						Option 1:
						<input
							type="text"
							value={option1}
							onChange={(e) => setOption1(e.target.value)}
							placeholder="Option 1"
							required
							className={`text-black text-sm font-normal mx-4 p-2 border-none rounded ${
								option1 && option1 === correctOption
									? "bg-cyan-500"
									: "bg-white"
							} outline-none
              }`}
						/>
						<BsCheck2
							onClick={() => setCorrectOption(option1)}
							className={`pt-1 ${
								option1 && option1 === correctOption
									? "text-blue-500"
									: "text-white"
							}`}
						/>
					</label>

					<label className="text-white text-2xl p-2 flex">
						Option 2:
						<input
							type="text"
							value={option2}
							onChange={(e) => setOption2(e.target.value)}
							placeholder="Option 2"
							required
							className={`text-black text-sm font-normal  mx-4 p-2 border-none rounded ${
								option2 && option2 === correctOption
									? "bg-cyan-500"
									: "bg-white"
							} outline-none
              `}
						/>
						<BsCheck2
							onClick={() => setCorrectOption(option2)}
							className={`pt-1 ${
								option2 && option2 === correctOption
									? "text-blue-500"
									: "text-white"
							}`}
						/>
					</label>

					<label className="text-white text-2xl p-2 flex">
						Option 3:
						<input
							type="text"
							value={option3}
							onChange={(e) => setOption3(e.target.value)}
							placeholder="Option 3"
							required
							className={`text-black text-sm font-normal mx-4 p-2 border-none rounded ${
								option3 && option3 === correctOption
									? "bg-cyan-500"
									: "bg-white"
							} outline-none
              `}
						/>
						<BsCheck2
							onClick={() => setCorrectOption(option3)}
							className={`pt-1 ${
								option3 && option3 === correctOption
									? "text-blue-500"
									: "text-white"
							}`}
						/>
					</label>

					<label className="text-white text-2xl p-2 flex">
						Option 4:
						<input
							type="text"
							value={option4}
							onChange={(e) => setOption4(e.target.value)}
							placeholder="Option 4"
							required
							className={`text-black text-sm  font-normal mx-4 mb-4 p-2 border-none rounded ${
								option4 && option4 === correctOption
									? "bg-cyan-500"
									: "text-white"
							} outline-none
              `}
						/>
						<BsCheck2
							onClick={() => setCorrectOption(option4)}
							className={`pt-1 ${
								option4 && option4 === correctOption
									? "text-blue-500"
									: "text-white"
							}`}
						/>
					</label>
					<label className="text-white text-base p-2">
						Correct option:
						<input
							type="text"
							value={correctOption}
							onChange={(e) => setCorrectOption(e.target.value)}
							placeholder="Add correct answer"
							required
							className={`text-black font-normal mx-4 p-2 border-none rounded outline-none text-sm `}
						/>
					</label>
					{/* Making the correct option glow */}
				</form>
				<div className="flex flex-row justify-between items-center">
					<button
						type="submit"
						className="rounded bg-white text-black p-1 mt-3 mr-6"
						onClick={handleSubmit}
					>
						Add Question
					</button>
					<button
						className="rounded bg-white text-black p-1 mt-3"
						type="submit"
						onClick={() => navigate("/view")}
					>
						View Questions
					</button>
				</div>
			</div>
		</div>
	)
}

export default Examiner
