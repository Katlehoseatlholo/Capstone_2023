CREATE TABLE Candidates (
    CandidateID INTEGER  PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Party VARCHAR(255),
    ElectionID INTEGER,
    FOREIGN KEY (ElectionID) REFERENCES Elections(ElectionID)
);