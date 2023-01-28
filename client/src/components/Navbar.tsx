import React, { useState, useEffect } from "react"
import { contractABI, contractAddress } from "../utils/constants"
import { ethers } from "ethers"
import { shortenAddress } from "../utils/shortenAddress"
import { useNavigate } from "react-router-dom"

const Navbar = (props: any) => {
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [currentAccount, setCurrentAccount] = useState<string>("")
	const [loggedIn, setLoggedIn] = useState(false)

	const ethereum = (window as any).ethereum

	const navigate = useNavigate()

	const checkIfWalletIsConnected = async () => {
		// console.log("In checkMetaMask")
		if (ethereum) {
			const newProvider = new ethers.providers.Web3Provider(ethereum)
			try {
				await ethereum.enable()
				setProvider(newProvider)
				console.log("MetaMask is connected!")
			} catch (err) {
				console.log("User denied access to MetaMask.")
			}
		} else {
			console.log("MetaMask is not installed.")
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected()
	}, [])

	const connectWallet = async () => {
		// console.log("In connect wallet")
		try {
			if (!ethereum) return alert("Please install metamask")
			console.log("In connect Wallet")
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			})
			// console.log("In connect wallet", accounts)

			setCurrentAccount(accounts[0])
			setIsConnected(true)
			props.onValueChange(accounts[0])
			// navigate("/")
			// window.location.reload()
		} catch (error) {
			console.log(error)
			throw new Error("No ethereum object")
		}
	}

	// const getEthereumContract = () => {
	// 	const provider = new ethers.providers.Web3Provider(ethereum)
	// 	const signer = provider.getSigner()
	// 	const answersContract = new ethers.Contract(
	// 		contractAddress,
	// 		contractABI,
	// 		signer
	// 	)
	// 	console.log(answersContract)
	// 	return answersContract
	// }

	// interface IAddQuestion {
	// 	address: unknown
	// 	question: string
	// 	isCorrect: boolean
	// 	timeTaken?: number
	// 	sus?: boolean
	// }
	// const addQuestion = async (props: IAddQuestion) => {
	// 	try {
	// 		if (!ethereum) return alert("Please install metamask")
	// 		const addressContract = getEthereumContract()
	// 		const temporaryObject = {
	// 			question: props.question,
	// 			isCorrect: props.isCorrect,
	// 		}
	// 		const addressHash = await addressContract.addQuestionAttempted(
	// 			currentAccount,
	// 			temporaryObject
	// 		)
	// 		setIsLoading(true)
	// 		console.log(`Loading - ${addressHash.hash}`)
	// 		await addressHash.wait()
	// 		setIsLoading(false)
	// 		console.log(`Success - ${addressHash.hash}`)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	return (
		<div className="flex flex-row justify-end items-center bg-black w-full">
			<div className="flex m-8 mb-16">
				<button
					type="submit"
					className="rounded flex flex-col bg-gray-500 text-xl text-white py-2 px-4 mt-3 mr-6"
					onClick={connectWallet}
				>
					{isConnected
						? `Connected ${shortenAddress(currentAccount)}`
						: "Connect Wallet"}
				</button>
			</div>
		</div>
	)
}

export default Navbar
