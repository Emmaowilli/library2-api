const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const oauthAuth = require('../middleware/oauthAuth');
const { bookRules, validate } =require('../middleware/bookRules');

const booksController = require('../controllers/booksController');
router.post('/', oauthAuth, auth, bookRules(), validate,  booksController.createBook);
router.get('/', auth, booksController.getAllBooks);
router.get('/:id', auth,  booksController.getBookById);
router.put('/:id', oauthAuth, auth, bookRules(), validate,  booksController.updateBook);
router.delete('/:id', oauthAuth,  auth,  booksController.deleteBook);

module.exports = router;
