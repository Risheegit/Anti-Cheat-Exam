Github: https://github.com/Risheegit/Anti-Cheat-Exam

To run the file, first clone the git repository. "npm install" can be used to install all dependencies and devDependencies
in the package. json. The command should be run separately for the client and server.

To run the code: Go to client folder and run "npm run dev". Go to server folder and run "nodemon"

Approach: Each question is drawn from a question bank, along with four possible answers and the correct answer. The option order is
shuffled to reduce cheating. Also, if the size of the question bank is large, the probability of two students having the same set
of questions is low. Sequential navigation is also implemented.
We can set the number of questions we need from the question bank along with the average time expected to solve each question.
The start and times of the quiz are noted, and if we find that the time taken is much less than average and the student's score is
high, the student is flagged (the student may have used an answer key to quickly solve questions).

Frontend (React + Typescript + Tailwind + Vite)-
To run the frontend, open the client folder in the cloned repository and run “npm run dev." (Make sure to go into server folder and
run “nodemon”)
This will run on http://localhost:5173 and one can answer the questions once tey connect to teir Metamask wallet. Since the answers
are stored on the blockchain, the user must have Metamask installed in order to store their answers.
Metamask is a browser extension that acts as a crypto wallet. For testing and development purposes, Goerli TestNet was used.
Your wallet address will act as your unique id.
The front end is written in typescript. Typescript is a strongly typed programming language built on top of Javascript that
reduces silly mistakes while writing code. Tailwind CSS allows us to write CSS directly into the HTML, which is easily customizable
and provides a lot of common utility patterns. VIte is a much faster alternative to Webpack(default) as a module bundler which
comes in with built in typescript support
The ethers.js package allows us to interact with the Ethereum blockchain. Axios allows us to make http requests from node.js
From the examiner’s perspective, we can go to http://localhost:5173/view to view all the questions. If we want to add a question,
we can go to http://localhost:5173/add to add a question to our database.

Smart Contract (Solidity + Hardhat + Alchemy) -
Our smart contract was written with solidity and tested on hardhat.
The smart contract can perform a variety of functions like automatically calculating score, finding number of questions, checking
flagged students etc.
The contract Answers has a struct Student with a unique address, score, and an object (question + whether they got it right or wrong).
The smart contract also has functionality to add questions attempted to a student. The score is automatically calculated depending
on the requirements of the exam (eg +3/ -1 or +1/0).
Alchemy is a web3 development platform. Alchemy offers a massive collection of APIs for creating different types of web3 solutions
in one place.
Hardhat allowed us to test the smart contract. Mocha and chai are used for testing our functions before compiling and deploying.
@nomic @nomicfoundation/hardhat-toolbox plugin bundles all the commonly used packages and Hardhat plugins.
npx hardhat test is used to test the contract with the tests we provide.
npx hardhat run scripts/deploy.js --network goerli is used for deploying on the goerli network

Backend (Express + Node + MongoDB + Postman)-
To run the backend, go to the server folder and run the "nodemon" command. Nodemon monitors the project directory and automatically restarts code when any changes are detected. Node.js is used to run Javascript outside the browser. Express is a Node.js application framework used for building web applications. MongoDB is a NoSQL database that is used to store our questions. Mongoose was used to design the schema of objects in MongoDB.
Postman was used to test our APIs before integrating with our frontend.
Rest APIs help us communicate with our backend and frontend.
When we want to view the questions we can send a GET request to our backend. Our backend server runs on http://localhost:5000/ and we need to send GET requests to http://localhost:5000/api/question . Similarly to add questions we need to send a POST request to http://localhost:5000/api/question
