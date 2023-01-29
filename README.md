# Anti-Cheat-Exam

## Running the code

The quiz system draws questions and their respective answers from a vast question bank. To maintain fairness and prevent cheating, the order of the options is randomly shuffled for each student. Additionally, the large size of the question bank reduces the chances of two students receiving the same set of questions. The quiz features a sequential navigation system (where you cannot go back to a previous question) to reduce cheating during the examination

Moreover, the system allows you to customize the number of questions you need from the question bank and even set an average time limit for solving each question. The start and end times of the quiz are recorded, and any unusual spikes in performance, such as a high score in a short amount of time, are flagged as potential instances of cheating.

## Getting Started

Clone the repository from GitHub: [https://github.com/Risheegit/Anti-Cheat-Exam](https://github.com/Risheegit/Anti-Cheat-Exam)
Navigate to both the client and server folders and run npm install to install all dependencies and devDependencies in the package.json.
To launch the frontend, navigate to the client folder and run
npm run dev.
In a separate terminal, navigate to the server folder and run
nodemon.
Connect to your Metamask wallet and start answering questions by visiting the URL [http://localhost:5173](http://localhost:5173).

### Frontend

The frontend is built using React, Typescript, Tailwind, and Vite. To launch the frontend:

Go to the client folder within the cloned repository and execute the command -

    npm run dev

Launch the server by navigating to the server folder and run

    nodemon

Access the frontend through the URL [http://localhost:5173](http://localhost:5173)
Connect to your Metamask wallet to start answering questions
Note: Having Metamask installed is a pre-requisite for the storage of your answers as they are stored on the blockchain. Metamask functions as a browser extension and serves as your crypto wallet. Your wallet address will serve as your unique identifier.

The frontend is written in TypeScript, a strongly-typed programming language built on top of JavaScript, which minimizes the occurrence of silly coding errors. With Tailwind CSS, HTML can be utilized to directly write CSS, offering ease of customization and a wide range of common utility patterns. In place of the default Webpack, Vite serves as a module bundler with built-in TypeScript support, providing a much faster alternative.

### Smart Contracts

The smart contract was written with solidity and tested on hardhat.
The smart contract can perform a variety of functions like automatically calculating score, finding number of questions, checking
flagged students etc.

The contract Answers has a struct Student with a unique address, score, and an object (question + whether they got it right or wrong).
The smart contract also has functionality to add questions attempted to a student. The score is automatically calculated depending
on the requirements of the exam (eg +3/ -1 or +1/0).
Alchemy is a web3 development platform. Alchemy offers a massive collection of APIs for creating different types of web3 solutions
in one place.

For thorough testing, Mocha and Chai were used to evaluate the contract functions prior to compilation and deployment. The @nomicfoundation/hardhat-toolbox plugin offers a comprehensive suite of commonly used packages and Hardhat plugins.

To test the commands use

    npx hardhat test

To run the commands on the Goerli network use

    npx hardhat run scripts/deploy.js --network goerli

### Backend

The backend is built with Express, NodeJS, Mongo DB and Postman

Go to the server folder in your cloned repository.
To launch the backend run the command

    nodemon

The backend is built using Node.js, which allows you to run Javascript outside of the browser. It is powered by the Express framework, which provides a set of tools for building web applications. The questions are stored in a MongoDB NoSQL database and the schema of the objects in the database is designed using Mongoose.

The API endpoints were tested using Postman before integrating with the frontend. REST APIs help communication between the backend and frontend. To view the questions, send a GET request to [http://localhost:5000/api/question]([http://localhost:5000/api/question]). To add questions, send a POST request to the same URL. Nodemon monitors the project directory and automatically restarts the code whenever changes are detected.

### Prerequisites

Requirements for the software and other tools to build, test and push

-   [Example 1](https://www.example.com)
-   [Example 2](https://www.example.com)

### Installing

A step by step series of examples that tell you how to get a development
environment running

Say what the step will be

    Give the example

And repeat

    until finished

End with an example of getting some data out of the system or using it
for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Sample Tests

Explain what these tests test and why

    Give an example

### Style test

Checks if the best practices and the right coding style has been used.

    Give an example

## Deployment

Add additional notes to deploy this on a live system

## Built With

-   [Contributor Covenant](https://www.contributor-covenant.org/) - Used
    for the Code of Conduct
-   [Creative Commons](https://creativecommons.org/) - Used to choose
    the license

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning. For the versions
available, see the [tags on this
repository](https://github.com/PurpleBooth/a-good-readme-template/tags).

## Authors

-   **Billie Thompson** - _Provided README Template_ -
    [PurpleBooth](https://github.com/PurpleBooth)

See also the list of
[contributors](https://github.com/PurpleBooth/a-good-readme-template/contributors)
who participated in this project.

## License

This project is licensed under the [CC0 1.0 Universal](LICENSE.md)
Creative Commons License - see the [LICENSE.md](LICENSE.md) file for
details

## Acknowledgments

-   Hat tip to anyone whose code is used
-   Inspiration
-   etc
