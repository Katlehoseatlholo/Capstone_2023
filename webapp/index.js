import express, { urlencoded, json } from "express";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import session from "express-session";
import cors from "cors";

// Enable CORS for all routes

const app = express();

// Configure session middleware
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
const initializeDatabase = async () => {
  try {
    const db = await sqlite.open({
      filename: "./101.db",
      driver: sqlite3.Database,
    });

    await db.migrate();
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

const startServer = async () => {
  const db = await initializeDatabase();

  // Express middleware
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(express.static("public"));

  // Registration route
  app.post("/register", async (req, res) => {
    const { emailID, password } = req.body;

    try {
      // Insert user data into the database (ensure proper validation and hashing)
      await db.run(
        "INSERT INTO Users (EmailID, Userpassword,VoteCount) VALUES (?, ?,0)",
        [emailID, password]
      );

      res.send("Registration successful");
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
  // Feed Post Function
app.post("/feed", async function (req, res) {
  const { text, image } = req.body;

  try {
      let stmt;
      let result;

      if (text && image) {
          // Text and Image Post
          stmt = db.prepare("INSERT INTO Feed (PostText, photo, DatePosted) VALUES (?, ?, ?)");
          result = await stmt.run(text, image, new Date().toISOString());
      } else if (text) {
          // Text Post
          stmt = db.prepare("INSERT INTO Feed (PostText, DatePosted) VALUES (?, ?)");
          result = await stmt.run(text, new Date().toISOString());
      } else {
          return res.status(400).json({ message: "Invalid request. Please provide text and/or image." });
      }

      stmt.finalize();

      if (result) {
          res.status(201).json({ message: "Post sent successfully" });
      } else {
          res.status(400).json({ message: "Failed to send post" });
      }
  } catch (error) {
      console.error("Oops, we ran into this error: " + error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  // Login route
  app.post("/login", async (req, res) => {
    const { emailID, password } = req.body;

    try {
      // Check user credentials against the database (ensure proper validation and hashing)
      const user = await db.get(
        "SELECT * FROM Users WHERE EmailID = ? AND Userpassword = ?",
        [emailID, password]
      );

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // User found, create a session variable
      req.session.user = user;

      if (user.emailID === "admin@gmail.com") {
        // Redirect the admin user to the admin dashboard
        return res.redirect("http://localhost:3000//admindashboard.html");
      } else {
        // Create a session variable to store user information
        return res.redirect("http://localhost:3000//profile.html");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  // Logout route
  app.get("/logout", async (req, res) => {
    try {
      // Destroy the session to log out the user
      req.session.destroy();
      res.send("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });

  // Fetch user details by email ID
  app.get("/user/:emailID", async (req, res) => {
    const { emailID } = req.params;

    try {
      const user = await db.get("SELECT * FROM Users WHERE EmailID = ?", [
        emailID,
      ]);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Error fetching user details" });
    }
  });

  //route to get User Posts

  app.get("/posts",  async function (req, res) {
    try {
      const feedPosts = await db.get("SELECT * FROM Feed WHERE EmailID = ?");
      
    } catch (error) {
      console.error("Opps we ran into this : " + error);
      res.send.json({ error: "Error fetching feed details" })
    }
  });
  // Update user details
  app.put("/user/:emailID", async (req, res) => {
    const { emailID } = req.params;
    const updatedUser = req.body;

    try {
      // Update the user's details in the database
      await db.run(
        "UPDATE Users SET FirstName = ?, LastName = ?, MobileNumber = ?, AddressLine1 = ?, Education = ? WHERE EmailID = ?",
        [
          updatedUser.FirstName,
          updatedUser.LastName,
          updatedUser.MobileNumber,
          updatedUser.AddressLine1,
          updatedUser.Education,
          emailID,
        ]
      );

      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Error updating user profile" });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
