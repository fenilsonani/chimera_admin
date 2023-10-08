const CandidateController = require('./candidateController');

const viewDashboard = async (req, res) => {
    const TotalCandidate = await CandidateController.countCandidates();
    const candidates = await CandidateController.getAllCandidates();
    res.render('dashboard', {
        title: 'Dashboard',
        TotalCandidate,
        candidates,
    });
};

const viewLogin = (req, res) => {
    res.render('index', {
        title: 'Login',
    });
};



module.exports = {viewDashboard, viewLogin };
