const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwallet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartWallet API is running' });
});

// Auth routes placeholder
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`SmartWallet API running on port ${PORT}`);
});