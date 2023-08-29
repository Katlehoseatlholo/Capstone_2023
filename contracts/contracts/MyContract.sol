
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

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
         addCandidate("Candidate 3");
        addCandidate("Candidate 4");
         addCandidate("Candidate 5");
        addCandidate("Candidate 6");
         addCandidate("Candidate 7");
        addCandidate("Candidate 8");
         addCandidate("Candidate 9");
        addCandidate("Candidate 10");

    }

    // Function to add a candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Function to vote for a candidate
    function vote(uint256 _candidateId) public {
        // Check if the voter has not voted before
        require(!voters[msg.sender], "You have already voted.");

        // Check if the candidate exists
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        // Record that the voter has voted
        voters[msg.sender] = true;

        // Increment the candidate's vote count
        candidates[_candidateId].voteCount++;

        // Emit the vote event
        emit VotedEvent(_candidateId);
    }

    // Function to get the winner candidate
    function getWinner() public view returns (string memory) {
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
}
