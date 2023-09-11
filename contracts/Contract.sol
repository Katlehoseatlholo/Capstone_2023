pragma solidity ^0.8.0;

contract Voting {
    // Structure to represent a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Mapping to store voters and their voting status
    mapping(address => bool) public voters;

    // Mapping to store candidates
    mapping(uint256 => Candidate) public candidates;

    // Store the total number of candidates
    uint256 public candidatesCount;

    // Event to notify when a voter has cast a vote
    event VotedEvent(uint256 indexed candidateId);

    // Owner of the contract
    address public owner;

    // Flags to track the voting status
    bool public votingStarted;
    bool public votingEnded;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier votingOpen() {
        require(votingStarted && !votingEnded, "Voting is not open.");
        _;
    }

    constructor() {
        owner = msg.sender;
        votingStarted = false;
        votingEnded = false;
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
        
    }

    // Function to add a candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Function to start the voting process (onlyOwner)
    function startVoting() public onlyOwner {
        require(!votingStarted, "Voting has already started.");
        votingStarted = true;
    }

    // Function to end the voting process (onlyOwner)
    function endVoting() public onlyOwner {
        require(votingStarted && !votingEnded, "Voting has not started or has already ended.");
        votingEnded = true;
    }

    // Function to vote for a candidate (when voting is open)
    function vote(uint256 _candidateId) public votingOpen {
        // Check if the voter has not voted before
        require(!voters[msg.sender], "You have already voted.");

        // Check if the candidate exists
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        // Record that the voter has voted
        voters[msg.sender] = true;

        // Increment the candidate's vote count
        candidates[_candidateId].voteCount++;

        // Calculate the amount of Ether to send to the voter (adjust this as needed)
        uint256 rewardAmount = 0.01 ether; // For example, 0.01 Ether as a reward

        // Transfer Ether to the voter
        payable(msg.sender).transfer(rewardAmount);

        // Emit the vote event
        emit VotedEvent(_candidateId);
    }

    // Function to get the winner candidate
    function getWinner() public view returns (string memory) {
        require(votingEnded, "Voting has not ended yet.");
        
        uint256 maxVotes = 0;
        string memory winnerName;

        for (uint256 i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerName = candidates[i].name;
            }
        }

        return winnerName;
    }

    // Function for the owner to send rewards to voters
    function sendReward(address _voter, uint256 _amount) public onlyOwner {
        // Ensure the voter has not been rewarded yet
        require(!voters[_voter], "This voter has already been rewarded.");

        // Transfer the specified amount of Ether to the voter
        payable(_voter).transfer(_amount);

        // Mark the voter as rewarded
        voters[_voter] = true;
    }
}
