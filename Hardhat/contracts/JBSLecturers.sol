// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JBSLecturers {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Mapping to track voters and their voting status
    mapping(address => bool) public voters;

    // Mapping to store information about candidates
    mapping(uint256 => Candidate) public candidates;

    // Total number of candidates
    uint256 public candidatesCount;

    // Address of the contract owner
    address public owner;

    // Flags to indicate the status of the voting process
    bool public votingStarted;
    bool public votingEnded;

    // Timestamps for the start and end of the voting process
    uint256 public votingStartTime;
    uint256 public votingEndTime;

    // Voting time in minutes
    uint256 public votingDuration;

    // Event to log when a voter casts a vote
    event VotedEvent(uint256 indexed candidateId);

    // Event to log when the voting process starts
    event VotingStartedEvent(uint256 startTime);

    // Event to log when the voting process ends
    event VotingEndedEvent(uint256 endTime);

    // Modifier to restrict access to the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Modifier to check if the voting process is open
    modifier votingOpen() {
        require(votingStarted && !votingEnded, "Voting is not open.");
        _;
    }

    // Constructor initializes the contract
    constructor(uint256 _votingDurationMinutes) {
        owner = msg.sender;
        votingStarted = false;
        votingEnded = false;
        votingDuration = _votingDurationMinutes * 1 minutes;
        addCandidate("Andre Vermeulen");
        addCandidate("Dr Uche");
        addCandidate("Dr Akinola");
          addCandidate(" Munien Inderasan");
        
    }

    // Function to add a candidate (private function)
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Function to start the voting process (onlyOwner)
    function startVoting() public onlyOwner {
        require(!votingStarted, "Voting has already started.");
        votingStarted = true;
        votingStartTime = block.timestamp; // Record the start time
        emit VotingStartedEvent(votingStartTime);
    }

    // Function to end the voting process (onlyOwner)
    function endVoting() public onlyOwner {
        require(votingStarted && !votingEnded, "Voting has not started or has already ended.");
        require(block.timestamp >= votingStartTime + votingDuration, "Voting duration not over yet.");
        votingEnded = true;
        votingEndTime = block.timestamp; // Record the end time
        emit VotingEndedEvent(votingEndTime);
    }

    // Function to allow a voter to cast a vote (when voting is open)
    function vote(uint256 _candidateId) public votingOpen {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit VotedEvent(_candidateId);
    }

    // Function to determine the winner after the voting process ends
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

    // Function for the owner to send rewards to voters of the winning candidate
    function sendReward(address[] memory _voters, uint256 _amount) public onlyOwner {
        require(votingEnded, "Voting has not ended yet.");
        require(bytes(getWinner()).length > 0, "No winner yet.");

        for (uint256 i = 0; i < _voters.length; i++) {
            address voter = _voters[i];
            require(voters[voter], "Not a valid voter.");
            voters[voter] = false; // Mark voter as rewarded
            payable(voter).transfer(_amount);
        }
    }
}
