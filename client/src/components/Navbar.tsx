import React, { useState } from "react"
import { contractABI, contractAddress } from "../utils/constants"
import { ethers } from "ethers"

const Navbar = () => {
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null)
	const [isConnected, setIsConnected] = useState(false)

	const ethereum = (window as any).ethereum

	const checkMetaMask = async () => {
		console.log("In checkMetaMask")
		if (ethereum) {
			const newProvider = new ethers.providers.Web3Provider(ethereum)
			try {
				await ethereum.enable()
				setProvider(newProvider)
				console.log("MetaMask is connected!")
				setIsConnected(true)
			} catch (err) {
				console.log("User denied access to MetaMask.")
			}
		} else {
			console.log("MetaMask is not installed.")
		}
	}

	const getEthereumContract = () => {
		const provider = new ethers.providers.Web3Provider(ethereum)
		const signer = provider.getSigner()
		const answersContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer
		)
		console.log(answersContract)
		return answersContract
	}

	return (
		<div className="flex flex-row justify-end items-center bg-black w-full">
			<div className="flex m-8 mb-16">
				<button
					type="submit"
					className="rounded bg-gray-500 text-xl text-white py-2 px-4 mt-3 mr-6"
					onClick={checkMetaMask}
				>
					{isConnected ? "Connected" : "Connect Wallet"}
				</button>
			</div>
		</div>
	)
}

export default Navbar
