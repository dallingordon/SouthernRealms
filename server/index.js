const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3001;

//this is for user stuff:
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000' // restrict calls to those originating from this domain
}));
// Path to your SQLite database
const dbPath = '../database/southernrealms.db';
console.log(`Database path: ${dbPath}`);
// Open the SQLite database
console.log(`Attempting to connect to the database at ${dbPath}`);
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error when connecting to the SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

//user stuff:
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
      if (err) {
        return res.status(500).send('Username is already taken');
      }
      res.send('User registered');
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(401).send('User not found');
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(403).send('Incorrect password');
      }

      const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    });
  });
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]; // Get the token from the header

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).send({error: 'Unauthorized: Invalid token'});
    } else {
      res.json({message: 'Welcome to the protected route!', user: decoded});
    }
  });
});




// Get a deck by deckid
app.get('/deck/:deckid', (req, res) => {
  const deckid = req.params.deckid;
  const sql = `
    SELECT ds.cardid, c.filename, ds.quantity
    FROM decksetup ds
    JOIN cards c ON ds.cardid = c.id
    WHERE ds.deckid = ?
  `;

  db.all(sql, [deckid], (err, rows) => {
    if (err) {
      res.status(400).send({error: err.message});
      return;
    }

    // Expand rows based on the quantity and include unique IDs and separate cardid
    const expandedRows = [];
    rows.forEach(row => {
      for (let i = 0; i < row.quantity; i++) {
        expandedRows.push({
          id: `${deckid}-${row.cardid}-${i}`, // Unique ID combining deckid, cardid, and instance count
          cardid: row.cardid,                // Original card ID
          filename: row.filename
        });
      }
    });

    shuffleArray(expandedRows); // im not sure about this.  i might make the db do it? not sure thats a good idea either.
    // do i care about persisting the order of the deck? idk
    res.json(expandedRows);
  });
});




// Endpoint to get card data
app.get('/cards', (req, res) => {

  const sql = "SELECT id, filename FROM cards"; // Replace your_card_table with your actual table name
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({error: err.message});
      return;
    }
    res.json(rows);
  });
});

app.get('/cards/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT filename FROM cards WHERE id = ?"; // Adjust with your actual table name
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(400).send({error: err.message});
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).send({error: 'Card not found'});
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
