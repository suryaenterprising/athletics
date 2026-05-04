require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Athletics Platform API is running...');
});

// Define Routes here later
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/athletes', require('./routes/athleteRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
