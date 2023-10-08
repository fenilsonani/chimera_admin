const CandidateController = require('./candidateController');
const QuestionSetController = require('./QuestionSetController');
const viewDashboard = async (req, res) => {
    const TotalCandidate = await CandidateController.countCandidates();
    const candidates = await CandidateController.getAllCandidates();
    const TotalQuestionSet = await QuestionSetController.countQuestionSet();

    res.render('dashboard', {
        title: 'Dashboard',
        TotalCandidate,
        TotalQuestionSet,
        candidates,
    });
};

const viewLogin = (req, res) => {
    res.render('index', {
        title: 'Login',
    });
};



module.exports = {viewDashboard, viewLogin };
