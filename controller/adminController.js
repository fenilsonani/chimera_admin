const viewDashboard = (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
    });
};

const  viewLogin = (req, res) => {
    res.render('index', {
        title: 'Login',
    });
};
module.exports = { viewDashboard , viewLogin };
