
        // Initialize Web3.js with the Ethereum provider
        const web3 = new Web3(Web3.givenProvider);

        // Contract address and ABI
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
        const contractABI = [ /* Replace with your contract ABI */ ];

        // Initialize the contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Function to set the voting start time
        function setVotingStartTime() {
            const startTime = document.getElementById('startTime').value;
            
            // Call the smart contract's startVoting function
            contract.methods.startVoting().send({ from: web3.currentProvider.selectedAddress })
                .then(() => {
                    alert('Voting started. Start time set to: ' + startTime);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Unable to start voting');
                });
        }

        // Function to set the voting end time
        function setVotingEndTime() {
            const endTime = document.getElementById('endTime').value;
            
            // Call the smart contract's endVoting function
            contract.methods.endVoting().send({ from: web3.currentProvider.selectedAddress })
                .then(() => {
                    alert('Voting ended. End time set to: ' + endTime);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Unable to end voting');
                });
        }

        // Function to add a new candidate
        function addCandidate() {
            const newCandidateName = document.getElementById('newCandidate').value;
            
            // Call the smart contract's addCandidate function
            contract.methods.addCandidate(newCandidateName).send({ from: web3.currentProvider.selectedAddress })
                .then(() => {
                    alert('New candidate added: ' + newCandidateName);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Unable to add candidate');
                });
        }

        // Function to send rewards to a voter
        function sendReward() {
            const voterAddress = document.getElementById('voterAddress').value;
            const rewardAmount = web3.utils.toWei(document.getElementById('rewardAmount').value, 'ether');
            
            // Call the smart contract's sendReward function
            contract.methods.sendReward(voterAddress, rewardAmount).send({ from: web3.currentProvider.selectedAddress })
                .then(() => {
                    alert('Reward sent to: ' + voterAddress);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Unable to send reward');
                });
        }

        // Function to check the winner
        function getWinner() {
            // Call the smart contract's getWinner function
            contract.methods.getWinner().call()
                .then(winner => {
                    alert('The winner is: ' + winner);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Unable to determine the winner');
                });
        }

        // Add more functions for other contract interactions
