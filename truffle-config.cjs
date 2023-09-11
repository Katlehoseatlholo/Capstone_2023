const HDWalletProvider = require("@truffle/hdwallet-provider");

const infuraKey = "1936cf74fdf74e5ea30c31186854ee77"; //  Infura API key
const mnemonic = "62e9b757837c4d52ab8816ca61d5f725"; //  your Ethereum wallet's mnemonic
require('dotenv').config();
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache default port
      network_id: "*", // Match any network ID
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3, // Ropsten's network id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
    },
    // Add other networks as needed (mainnet, rinkeby, etc.)
  },
};
