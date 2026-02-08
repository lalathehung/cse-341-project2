const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
   //#swagger.tags=['Books']
   try {
      const result = await mongodb.getDatabase().collection('books').find();
      const books = await result.toArray();
      res.status(200).json(books);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const getBookById = async (req, res) => {
   //#swagger.tags=['Books']
   try {
      const bookId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().collection('books').find({ _id: bookId });
      const book = (await result.toArray())[0];

      if (!book) {
         return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200).json(book);
   } catch (err) {
      res.status(400).json({ error: 'Invalid book ID format' });
   }
};

const createBook = async (req, res) => {
   //#swagger.tags=['Books']
   const book = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publishYear: req.body.publishYear,
      genre: req.body.genre,
      pages: req.body.pages,
      price: req.body.price,
      publisher: req.body.publisher
   };

   // Simple check
   if (!book.title || !book.author || !book.isbn || !book.publishYear) {
      return res.status(400).json({ error: 'title, author, isbn, publishYear are required' });
   }

   try {
      const response = await mongodb.getDatabase().collection('books').insertOne(book);
      res.status(201).json({ _id: response.insertedId });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const updateBook = async (req, res) => {
   //#swagger.tags=['Books']
   try {
      const bookId = new ObjectId(req.params.id);
      const book = {
         title: req.body.title,
         author: req.body.author,
         isbn: req.body.isbn,
         publishYear: req.body.publishYear,
         genre: req.body.genre,
         pages: req.body.pages,
         price: req.body.price,
         publisher: req.body.publisher
      };

      const response = await mongodb.getDatabase().collection('books').replaceOne({ _id: bookId }, book);
      if (response.modifiedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'Book not found or no changes' });
      }
   } catch (err) {
      res.status(400).json({ error: 'Invalid book ID or data' });
   }
};

const deleteBook = async (req, res) => {
   //#swagger.tags=['Books']
   try {
      const bookId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().collection('books').deleteOne({ _id: bookId });
      if (response.deletedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'Book not found' });
      }
   } catch (err) {
      res.status(400).json({ error: 'Invalid book ID' });
   }
};

module.exports = {
   getAllBooks,
   getBookById,
   createBook,
   updateBook,
   deleteBook
};