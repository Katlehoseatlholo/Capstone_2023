const YourContractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalVotes",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "candidate",
                "type": "string"
            }
        ],
        "name": "voteForCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const YourContractAddress = "";

// For Web3.js
import Web3 from 'web3';
const web3 = new Web3('https://goerli.infura.io/v3/62e9b757837c4d52ab8816ca61d5f725');

const contractAbi = YourContractABI;
const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// OR

// For ethers.js
//const { ethers } = require('ethers');
// const provider = new ethers.providers.JsonRpcProvider('<YourRPCURL>');

// const contractAbi = YourContractABI;
// const contractAddress = YourContractAddress;
// const contract = new ethers.Contract(contractAddress, contractAbi, provider);
