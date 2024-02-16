require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.18",
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};


// CryptoDevsNFT deployed to: 0xb38d97eB86835A1884419e9DB69756003cB1a850
// FakeNFTMarketplace deployed to: 0xc21F3A38F72AeA2278672A0457bf7fE013d183c8
// CryptoDevsDAO deployed to: 0x8fEe912a662A67481769c8914783B07433E75f78