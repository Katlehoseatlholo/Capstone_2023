
// For Web3.js
//import Web3 from 'web3';

// Initialize Web3.js

const YourContractABI = [
    {
        "compiler": {
            "version": "0.8.18+commit.87f61d96"
        },
        "language": "Solidity",
        "output": {
            "abi": [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "candidateId",
                            "type": "uint256"
                        }
                    ],
                    "name": "VotedEvent",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "candidates",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "voteCount",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "candidatesCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "endVoting",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getWinner",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_voter",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "sendReward",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "startVoting",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_candidateId",
                            "type": "uint256"
                        }
                    ],
                    "name": "vote",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "voters",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "votingEnded",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "votingStarted",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            "devdoc": {
                "kind": "dev",
                "methods": {},
                "version": 1
            },
            "userdoc": {
                "kind": "user",
                "methods": {},
                "version": 1
            }
        },
        "settings": {
            "compilationTarget": {
                "github/Katlehoseatlholo/Capstone_2023/contracts/Contract.sol": "Voting"
            },
            "evmVersion": "paris",
            "libraries": {},
            "metadata": {
                "bytecodeHash": "ipfs"
            },
            "optimizer": {
                "enabled": false,
                "runs": 200
            },
            "remappings": []
        },
        "sources": {
            "github/Katlehoseatlholo/Capstone_2023/contracts/Contract.sol": {
                "keccak256": "0x0d596f8624dd3a4474acfb023eef7d39ef609e4edb0d90bb977b7822517b0fd0",
                "license": "MIT",
                "urls": [
                    "bzz-raw://6ac8225b1ac8ab9fd1b02eed9efc509ce0f79d45f251249fbe57dcf86e5d0eae",
                    "dweb:/ipfs/QmWYNw8i7hxXUJDtDQqAZyN4WMF4aDAbrrjX2weEDWMaew"
                ]
            }
        },
        "version": 1
    }
];

//const web3 = new Web3('https://mainnet.infura.io/v3/62e9b757837c4d52ab8816ca61d5f725');

//const contractAbi = YourContractABI;
//const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
//const contract = new web3.eth.Contract(contractAbi, contractAddress);

// OR


// For ethers.js
//const { ethers } = require('ethers');
// const provider = new ethers.providers.JsonRpcProvider('<YourRPCURL>');

// const contractAbi = YourContractABI;
// const contractAddress = YourContractAddress;
// const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Import Web3.js library


async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable(); // Request user permission
            return true;
        } catch (error) {
            console.error("User denied access to wallet");
            return false;
        }
    } else {
        console.error("MetaMask not detected");
        return false;
    }
}
// Function to cast a vote
async function vote(candidateId) {
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.vote(candidateId).send({ from: accounts[0] });
        alert("Vote cast successfully");
    } catch (error) {
        console.error("Error casting vote:", error);
    }
}

// Event listener for the "VOTE" button
document.getElementById("acceptConditions").addEventListener("click", async () => {
    const web3Initialized = await initWeb3();
    if (web3Initialized) {
        // Show the accept and decline buttons
        document.getElementById("acceptButton").style.display = "block";
        document.getElementById("declineButton").style.display = "block";

        // Hide the "VOTE" button
        document.getElementById("acceptConditions").style.display = "none";
    }
});

// Event listener for the "Accept" button
document.getElementById("acceptButton").addEventListener("click", () => {
    // Replace the argument with the candidate ID you want to vote for
    const candidateId = 1; // Example: Voting for candidate with ID 1
    vote(candidateId);
});

// Event listener for the "Decline" button
document.getElementById("declineButton").addEventListener("click", () => {
    // Handle user declining the vote
});
