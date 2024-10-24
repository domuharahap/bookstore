const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const router = express.Router();

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.PG_HOST || 'postgres-service.postgres.svc.cluster.local',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
  database: process.env.PG_DATABASE || 'bookstore',
});

// Render the home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

// API route to fetch books from the database
router.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle book submission
router.post('/add-book', async (req, res) => {
  const { title } = req.body;
  try {
    await pool.query('INSERT INTO books (title) VALUES ($1)', [title]);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(`Error adding book: ${error.message}`);
  }
});

module.exports = router;
