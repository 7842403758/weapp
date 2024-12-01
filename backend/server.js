const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('frontend'));

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'webapp'
});

// API Routes
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json({ users: results, count: results.length });
  });
});

app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (err) => {
    if (err) throw err;
    res.status(201).send('User added');
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
