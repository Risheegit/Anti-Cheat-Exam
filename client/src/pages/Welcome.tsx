import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

const Welcome = () => {
	const navigate = useNavigate()
	const [currentAccount, setCurrentAccount] = useState("")

	const proceed = () => {
		navigate("/questions", { state: { currentAccount } })
	}
	return (
		<div className="bg-black  flex flex-col w-full h-screen items-center">
			<Navbar onValueChange={setCurrentAccount} />
			<div className="bg-gray-600  w-4/12 backdrop-blur-lg rounded-lg items-start flex flex-col p-4 ">
				<h1 className=" flex flex-row text-white text-3xl p-4 ">
					Connect your wallet to proceed
				</h1>
				<p className=" flex flex-row font-light text-white text-2xl p-4 pl-12 ">
					Please make sure to install and have a metamask account to
					write the test
				</p>
				{currentAccount && (
					<div className="flex ml-auto items-center justify-end">
						<button
							className="rounded bg-gray-500 text-xl text-white py-2 px-4 mt-3 mr-6"
							type="submit"
							onClick={proceed}
						>
							Proceed
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Welcome
