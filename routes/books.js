const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const oauthAuth = require('../middleware/oauthAuth');
const { body } = require('express-validator');
const {bookRules, validate } = require('../middleware/validate');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const booksController = require('../controllers/booksController');
router.post('/',  ensureAuthenticated, bookRules(), validate,  booksController.createBook);
router.get('/', ensureAuthenticated, booksController.getAllBooks);
router.get('/:id', ensureAuthenticated,  booksController.getBookById);
router.put('/:id',  ensureAuthenticated, bookRules(), validate,  booksController.updateBook);
router.delete('/:id', ensureAuthenticated,  booksController.deleteBook);

module.exports = router;
