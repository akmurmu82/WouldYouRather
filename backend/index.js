// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To use environment variables from a .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// const mongoURI = process.env.MONGO_URI || 'your_default_mongo_connection_string_here';
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// Example Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Would You Rather API');
});

// You can add routes for handling questions, users, etc.
// For example, a question route could look like this:
// const questionRoutes = require('./routes/questions');
// app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
