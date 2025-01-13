const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path: './.env' });

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,                                                                          
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database.');
});

// Routes

// Route: Sign up
app.post('/', (req, res) => {
    const { name, mobile, email, password } = req.body;

    // Check for empty fields
    if (!name || !mobile || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'INSERT INTO users (name, mobile, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, mobile, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists.' });
            }
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Route: Log in
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!', redirect: '/home' });
        } else {
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    });
});

// Route: Home (example placeholder)
app.get('/home', (req, res) => {
    res.send('Welcome to the home page!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
