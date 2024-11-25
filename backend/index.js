// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const QuestionModel = require('./models/QuestionModel');
require('dotenv').config(); // To use environment variables from a .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI;
const connectToDb = () => mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Example Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Would You Rather API');
});

// Fetch questions
app.get('/questions', async (req, res) => {
  try {
    const allQuestions = await QuestionModel.find()
    res.status(200).json({ data: allQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }

});

// Add a new question endpoint
app.post('/questions/add', async (req, res) => {
  try {
    const { questionText, options, category, public: isPublic } = req.body;
    const existingQuestion = await QuestionModel.findOne({ questionText })

    // Create and save the new question
    if (!existingQuestion) {
      const question = new QuestionModel({ questionText, options, category, public: isPublic });
      await question.save();
      return res.status(200).json({  message: 'Question added succesfully', data: question });
    } else {
      res.status(403).json({ message: 'Question already exists', data: existingQuestion });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add question' });
  }

});

// Update a question by ID
app.patch('/questions/update/:questionId', async (req, res) => {
  const { questionId } = req.params;
  const { questionText, options, category, public: isPublic } = req.body;

  try {
    // Find the question and update the fields
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      { questionText, options, category, public: isPublic },
      { new: true } // This option returns the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});


// Add a new question endpoint
app.delete('/questions/remove/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    await QuestionModel.findByIdAndDelete({ _id })
    return res.status(200).json({ message: 'Question removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove question' });
  }
});

// You can add routes for handling questions, users, etc.
// For example, a question route could look like this:
// const questionRoutes = require('./routes/questions');
// app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectToDb()
  } catch (error) {
    console.log("Error connecting to DB:", error)
  }
  console.log(`Server is running on port ${PORT}`);
});
