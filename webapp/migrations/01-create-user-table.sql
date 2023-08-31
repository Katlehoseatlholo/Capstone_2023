CREATE TABLE if not exists Users (
    UserID INTEGER PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    MobileNumber VARCHAR(15),
    AddressLine1 VARCHAR(255),
    EmailID VARCHAR(255) NOT NULL,
    Userpassword VARCHAR(255) NOT NULL,
    Education VARCHAR(255),
    VoteCount INT 
);

INSERT INTO Users (FirstName, LastName, MobileNumber, AddressLine1, EmailID, Userpassword, Education, VoteCount)
VALUES ('Adam', 'Admin', '7336453783', '4th Ave Street', 'admin@gmail.com', '1234', 'Bachelor of Governance', 0);

