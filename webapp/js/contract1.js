    // Example: Accept the contract
    document.getElementById('acceptConditions').addEventListener('click', () => {
        // Hide the information section
        document.querySelector('.information').style.display = 'none';

        // Show the voting buttons
        document.getElementById('acceptButton').style.display = 'inline-block';
        document.getElementById('declineButton').style.display = 'inline-block';
    });

    // Rest of your JavaScript code for contract interaction here...
