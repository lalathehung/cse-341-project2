const router = require('express').Router();

router.get('/', (req, res) => {res.send('Welcome to Book Library API');});

router.use('/books', require('./books'));
router.use('/categories', require('./categories'));

module.exports = router;