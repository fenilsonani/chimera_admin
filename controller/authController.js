const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.redirect('back');
            }

            req.session.user = user;
            res.redirect('dashboard');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/login');
        });
    },

    checkAuthenticated(req, res, next) {
        if (req.session.user) {
            return next();
        }
        res.redirect('admin/');
    },

    checkNotAuthenticated(req, res, next) {
        if (!req.session.user) {
            return next();
        }
        res.redirect('admin/dashboard');
    },
};
