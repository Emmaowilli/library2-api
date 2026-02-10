const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const booksController = require('../controllers/booksController');
router.post('/', auth,  booksController.createBook);
router.get('/', auth,  booksController.getAllBooks);
router.get('/:id', auth,  booksController.getBookById);
router.put('/:id', auth,  booksController.updateBook);
router.delete('/:id', auth,  booksController.deleteBook);

module.exports = router;
