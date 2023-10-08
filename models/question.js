const mongoose = require('mongoose');

// Define the schema for a Question
const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['multipleChoice', 'shortAnswer'],
        required: true,
    },
    options: [{
        text: String,
        isCorrect: Boolean,
    }],
});

// Create and export the Question model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
