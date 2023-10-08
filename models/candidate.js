const mongoose = require('mongoose');


// Define the Candidate schema
const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //  validation for email format here if needed

    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

// Create and export the Candidate model
module.exports = mongoose.model('Candidate', candidateSchema);
