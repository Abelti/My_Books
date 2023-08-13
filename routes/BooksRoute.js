const express = require('express');
const { getAllBooks, getBookById, getBookByAuthor, getBookByTitle, updateBooks, deleteBooks, addBooks } = require('../controller/BooksController');
const router = express.Router();

// book list
// single books: id, author, title
// edit info
// delete
// create

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.get('/:author', getBookByAuthor);

router.get('/:title', getBookByTitle);

router.put('/:id', updateBooks);

router.delete('/:id', deleteBooks);

router.post('/add', addBooks);

module .exports = router;