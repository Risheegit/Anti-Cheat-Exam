import { ethers } from "hardhat";
// import { ethers } from "ethers";

async function main() {
  const Answers = await ethers.getContractFactory("Answers");
  const answers = await Answers.deploy();

  await answers.deployed();

  console.log("Transactions deployed to: ", answers.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3
