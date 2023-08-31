CREATE TABLE Votes (
    VoteID INT AUTOINCREMENT PRIMARY KEY,
    VoterID INT,
    CandidateID INT,
    ElectionID INT,
    VoteDate DATETIME,
    FOREIGN KEY (VoterID) REFERENCES Voters(VoterID),
    FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID),
    FOREIGN KEY (ElectionID) REFERENCES Elections(ElectionID)
);