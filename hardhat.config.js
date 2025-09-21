require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    hardhat:{},
    sepolia:{
      url:process.env.SEPOLIA_URL,
      accounts:[process.env.SEPOLIA_PRIVATE_KEY],
      chainId:11155111
    }
  }

};
