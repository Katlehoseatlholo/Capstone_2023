import express, { urlencoded, json } from 'express';
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import session from 'express-session';

const app = express();

// Configure session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

const db = await sqlite.open({
  filename: "./101.db",
  driver: sqlite3.Database,
});

await db.migrate();

/////////////////// 
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Welcome to your website');
});

// Add your user management and authentication routes here
// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Insert user data into the database (ensure proper validation and hashing)
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Registration failed' });
      }
      res.send('Registration successful');
    });
  });
  
  // Login route
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check user credentials against the database (ensure proper validation and hashing)
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create a session variable to store user information
      req.session.user = user;
  
      res.send('Login successful');
    });
  });
  
  // Logout route
  app.get('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.send('Logout successful');
    });
  });

  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
