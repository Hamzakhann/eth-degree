require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};

// 0xade4C3aDacE00Fe994306e67DcbCE8Dea0ED83c3

