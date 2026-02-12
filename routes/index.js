const passport = require('passport');
const router = require('express').Router();

router.get('/', (req, res) => {res.send('Welcome to Book Library API');});

router.use('/books', require('./books'));
router.use('/categories', require('./categories'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req,res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/')
    });
})

module.exports = router;