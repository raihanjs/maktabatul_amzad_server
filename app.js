const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

const routes = require('./routes/index');
app.use('/api/v1/', routes);

module.exports = app;