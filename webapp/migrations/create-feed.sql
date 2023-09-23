CREATE TABLE IF NOT EXISTS Feed (
    PostID INTEGER PRIMARY KEY,
    PostText VARCHAR(255),
    photo BLOB, -- Assuming "Image" is for binary data
    DatePosted DATE,
    nLikes INTEGER,
    nComments INTEGER
);

-- Create a separate table for comments
CREATE TABLE IF NOT EXISTS Comments (
    CommentID INTEGER PRIMARY KEY,
    PostID INTEGER, -- Foreign key to associate comments with a post
    CommentText TEXT,
    FOREIGN KEY (PostID) REFERENCES Feed (PostID)
);

