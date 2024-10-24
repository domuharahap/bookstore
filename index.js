const express = require('express');
const path = require('path');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const notFoundRoutes = require('./routes/notfound');

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS) from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route modules
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('*', notFoundRoutes); // Catch-all for 404

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
