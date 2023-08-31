CREATE TABLE Candidates (
    CandidateID INT AUTOINCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Party VARCHAR(255),
    ElectionID INT,
    FOREIGN KEY (ElectionID) REFERENCES Elections(ElectionID)
);