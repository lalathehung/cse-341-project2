const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {res.send('Welcome to Book Library API');});

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req,res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/')
    });
});

router.use('/books', require('./books'));
router.use('/categories', require('./categories'));

module.exports = router;