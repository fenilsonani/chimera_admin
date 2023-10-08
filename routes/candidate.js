const express = require('express');
const router = express.Router();

const CandidateController = require("../controller/candidateController");

// router.get("/" , CandidateController.viewCandidates);
router.post("/add" , CandidateController.addCandidate);
module.exports = router;