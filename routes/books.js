const router = require('express').Router();
const booksController = require('../controllers/books');

const { isAuthenticated } = require("../middleware/authenticate.js");

// GET all books
router.get('/', booksController.getAllBooks);

// GET book by id
router.get('/:id', booksController.getBookById);

// POST create book
router.post('/', isAuthenticated, booksController.createBook);

// PUT update book by id
router.put('/:id', isAuthenticated, booksController.updateBook);

// DELETE book by id
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;