const router = require('express').Router();
const passport = require('passport');

// Root 
router.get('/', (req, res) => {
    // Check
    res.send(req.user !== undefined ? `Logged in as ${req.user.displayName || req.user.username}` : "Logged Out");
});

// Login
router.get('/login', passport.authenticate('github'));

// Logout 
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.use('/books', require('./books'));
router.use('/categories', require('./categories'));

module.exports = router;