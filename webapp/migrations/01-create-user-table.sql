CREATE TABLE User (
    UserID INT AUTOINCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    MobileNumber VARCHAR(15),
    AddressLine1 VARCHAR(255),
    EmailID VARCHAR(255) UNIQUE NOT NULL,
    Userpassword VARCHAR(255) NOT NULL,
    Education VARCHAR(255),
    VoteCount INT 
);
INSERT INTO User (FirstName, LastName, MobileNumber, AddressLine1, EmailID, Userpassword, Education, VoteCount)
VALUES ('Daniel', 'Donye', '7366878933', '123 Pluto Street', 'tint@example.com', '123password', 'Bachelor of Commerce', 0);

