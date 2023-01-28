import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-ethers"
require("dotenv").config()
//

// const config: HardhatUserConfig = {
// 	solidity: "0.8.17",
// 	networks: {
// 		goerli: {
// 			url: process.env.ALCHEMY_RINKEBY_URL,
// 			accounts: [process.env.ACCOUNT_PRIVATE_KEY],
// 		},
// 	},
// }

// export default config

//0xEeEA0B9F8925fC186A1A1eb8396E5a10Dc64cB03
module.exports = {
	solidity: "0.8.17",
	networks: {
		goerli: {
			url: process.env.ALCHEMY_RINKEBY_URL,
			accounts: [process.env.ACCOUNT_PRIVATE_KEY],
		},
	},
}
