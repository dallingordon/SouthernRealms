const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

// Path to your SQLite database
const dbPath = 'path/to/your/database.db';

// Open the SQLite database
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Endpoint to get card data
app.get('/cards', (req, res) => {
  const sql = "SELECT id, filename FROM your_card_table"; // Replace your_card_table with your actual table name
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send({error: err.message});
      return;
    }
    res.json(rows);
  });
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
