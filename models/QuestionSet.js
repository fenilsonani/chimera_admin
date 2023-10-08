const mongoose = require('mongoose');

// Define the schema for a Question
// const questionSchema = new mongoose.Schema({
//     text: {
//         type: String,
//         required: true,
//     },
//     // Add other properties of a question if needed
// });

// Define the schema for a Question Set
const questionSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Define a relationship with the Question model
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
});

// Create and export the Question Set model
const QuestionSet = mongoose.model('QuestionSet', questionSetSchema);

module.exports = QuestionSet;
