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
const Web3 = require('web3');
const web3 = new Web3('<YourRPCURL>');

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
