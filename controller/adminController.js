const viewDashboard = (req, res) => {
    res.render('index', {
        title: 'Dashboard',
    });
};

module.exports = { viewDashboard };
