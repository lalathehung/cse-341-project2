const router = require('express').Router();
const booksController = require('../controllers/books');

// GET all books
router.get('/', booksController.getAllBooks);

// GET book by id
router.get('/:id', booksController.getBookById);

// POST create book
router.post('/', booksController.createBook);

// PUT update book by id
router.put('/:id', booksController.updateBook);

// DELETE book by id
router.delete('/:id', booksController.deleteBook);

module.exports = router;