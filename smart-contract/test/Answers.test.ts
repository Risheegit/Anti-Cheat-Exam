import { ethers } from "hardhat"
import { Contract } from "ethers"
import path from "path"
import fs from "fs"
import { Signer } from "ethers"
import { expect } from "chai"

const answersJsonPath = path.join(
	__dirname,
	"../artifacts/contracts/Answers.sol/Answers.json"
)
const answersJson = JSON.parse(fs.readFileSync(answersJsonPath).toString())
// const answersAbi = answersJson.compilerOutput.abi;
const { abi } = answersJson
const { bytecode } = answersJson
//Works till ere

describe("Answers Contract", () => {
	let answersInstance: Contract

	beforeEach(async () => {
		// Create a new instance of the contract
		const signers = await ethers.getSigners()
		const signer: Signer = signers[0]
		const factory = await ethers.getContractFactory("Answers", signer)
		// Deploy the contract
		answersInstance = await factory.deploy()
	})

	it("Should store a question correctly", async () => {
		// Define the question and correct answer
		const question = {
			question: "What is the colour of the sky?",
			isCorrect: true,
		}
		const student = ethers.utils.getAddress(
			await ethers.provider.getSigner().getAddress()
		)

		// Call the addQuestionAttempted function
		const tx = await answersInstance.addQuestionAttempted(student, question)
		await tx.wait()

		// Retrieve the stored question and answer
		const noOfQuestions = await answersInstance.noOfQuestions(student)
		console.log(noOfQuestions)

		// Expect the stored question and answer to match the original ones
		expect(noOfQuestions.toNumber()).to.equal(1)
	})

	it("Should return the correct score", async () => {
		const student = ethers.utils.getAddress(
			await ethers.provider.getSigner().getAddress()
		)
		const question = {
			question: "What is the colour of the sky?",
			isCorrect: true,
		}
		// Add a question to the contract
		await answersInstance.addQuestionAttempted(student, question)

		// Check the score of the student
		const score = await answersInstance.viewScore(student)

		// Expect the score to be 1
		expect(score.toNumber()).to.equal(1)
	})

	it("Should add time taken and set sus status", async () => {
		const student = ethers.utils.getAddress(
			await ethers.provider.getSigner().getAddress()
		)
		const timeTaken = 10000
		const sus = true

		await answersInstance.addTime(student, timeTaken, sus)
		const status = await answersInstance.checkStatus(student)
		expect(status).to.equal(true)
	})

	it("Should add all params", async () => {
		const student = ethers.utils.getAddress(
			await ethers.provider.getSigner().getAddress()
		)
		const timeTaken = 10000
		const sus = true
		const questions = [
			{
				question: "What is the colour of the sky?",
				isCorrect: true,
			},
		]
		await answersInstance.addFinal(student, questions, timeTaken, sus)
		const status = await answersInstance.checkStatus(student)
		expect(status).to.equal(true)
	})
})
