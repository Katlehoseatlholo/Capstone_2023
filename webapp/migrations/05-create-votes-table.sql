CREATE TABLE Votes (
    VoteID INTEGER  PRIMARY KEY,
    VoterID INTEGER,
    CandidateID INTEGER,
    ElectionID INTEGER,
    VoteDate DATETIME,
    FOREIGN KEY (VoterID) REFERENCES Voters(VoterID),
    FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID),
    FOREIGN KEY (ElectionID) REFERENCES Elections(ElectionID)
);