// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProjectManagementVoting {
    struct Project {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint256 => Project) public projects;
    uint256 public projectsCount;
    address payable public owner; // Declare owner as address payable
    bool public votingStarted;
    bool public votingEnded;
    uint256 public votingStartTime;
    uint256 public votingEndTime;

    event VotedEvent(uint256 indexed projectId, address indexed voter, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier votingOpen() {
        require(votingStarted && !votingEnded, "Voting is not open.");
        _;
    }

    constructor() {
        owner = payable(msg.sender); // Convert msg.sender to an address payable
        votingStarted = false;
        votingEnded = false;
        addProject("Brics AWS");
        addProject("Project Zuma");
        addProject("Zero Loadshedding");
    }

    function addProject(string memory _name) private {
        projectsCount++;
        projects[projectsCount] = Project(projectsCount, _name, 0);
    }

    function startVoting() public onlyOwner {
        require(!votingStarted, "Voting has already started.");
        votingStarted = true;
        votingStartTime = block.timestamp; // Record the start time
    }

    function endVoting() public onlyOwner {
        require(votingStarted && !votingEnded, "Voting has not started or has already ended.");
        votingEnded = true;
        votingEndTime = block.timestamp; // Record the end time
    }

    function vote(uint256 _projectId) public payable votingOpen {
        require(!voters[msg.sender], "You have already voted.");
        require(_projectId > 0 && _projectId <= projectsCount, "Invalid project.");

        voters[msg.sender] = true;
        projects[_projectId].voteCount++;

        // Send the Ether received with the vote to the contract owner
        owner.transfer(msg.value);

        emit VotedEvent(_projectId, msg.sender, block.timestamp);
    }

    function getWinner() public view returns (string memory) {
        require(votingEnded, "Voting has not ended yet.");
        
        uint256 maxVotes = 0;
        string memory winnerName;

        for (uint256 i = 1; i <= projectsCount; i++) {
            if (projects[i].voteCount > maxVotes) {
                maxVotes = projects[i].voteCount;
                winnerName = projects[i].name;
            }
        }

        return winnerName;
    }
}
