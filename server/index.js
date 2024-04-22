const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000' // restrict calls to those originating from this domain
}));
// Path to your SQLite database
const dbPath = '../database/southernrealms.db';
console.log(`Database path: ${dbPath}`);
// Open the SQLite database
console.log(`Attempting to connect to the database at ${dbPath}`);
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error when connecting to the SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
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
