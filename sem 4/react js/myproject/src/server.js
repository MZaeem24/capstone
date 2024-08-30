// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'restaurant_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Reservations Routes
app.get('/api/reservations', (req, res) => {
  db.query('SELECT * FROM reservations', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/api/reservations', (req, res) => {
  const { name, date, time, partySize } = req.body;
  db.query('INSERT INTO reservations (name, date, time, partySize) VALUES (?, ?, ?, ?)', [name, date, time, partySize], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...req.body });
  });
});

// Orders Routes
app.get('/api/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/api/orders', (req, res) => {
  const { tableNumber, menuItem, quantity } = req.body;
  db.query('INSERT INTO orders (tableNumber, menuItem, quantity) VALUES (?, ?, ?)', [tableNumber, menuItem, quantity], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...req.body });
  });
});

// Inventory Routes
app.get('/api/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/api/inventory', (req, res) => {
  const { itemName, quantity, threshold } = req.body;
  db.query('INSERT INTO inventory (itemName, quantity, threshold) VALUES (?, ?, ?)', [itemName, quantity, threshold], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...req.body });
  });
});

// Users Routes
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/api/users', (req, res) => {
  const { userName, role } = req.body;
  db.query('INSERT INTO users (userName, role) VALUES (?, ?)', [userName, role], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...req.body });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
