const Candidate = require('../models/candidate');

async function countCandidates() {
    try {
        const count = await Candidate.countDocuments();
        return count;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//get all candidates
async function getAllCandidates() {
    try {
        const candidates = await Candidate.find();
        return candidates;
    } catch (error) {
        console.error(error);
        return  res.json({message: "Something Wents Wrong"})
    }
}

// function to add candidate from a form
async function addCandidate(req, res) {
    // console.log(req.body);

    try {
        const newCandidate = new Candidate(req.body);
        const savedCandidate = await newCandidate.save();
        res.send(savedCandidate);
    } catch (error) {
        console.error(error);
        // send error msg by json
        res.status(200).json({message:"Something Wrong"})
    }
}
async function  viewCandidates(req, res) {
    const candidates = await getAllCandidates();
    res.render('candidates', { title: 'Candidates'  , candidates});
}

module.exports = {countCandidates, getAllCandidates, addCandidate , viewCandidates};
