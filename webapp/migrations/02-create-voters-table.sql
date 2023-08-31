CREATE TABLE Voters (
    VoterID INT AUTOINCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    DateOfBirth DATE,
    Address VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Username VARCHAR(50) UNIQUE,
    Password VARCHAR(255)
);