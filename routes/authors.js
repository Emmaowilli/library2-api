const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const oauthAuth = require('../middleware/oauthAuth');
const { body } = require('express-validator');
const {authorRules, validate } = require('../middleware/validate');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const authorsController = require('../controllers/authorsController');
router.get('/', ensureAuthenticated , authorsController.getAllAuthors);
router.get('/:id', ensureAuthenticated,  authorsController.getAuthorById);
router.post('/', ensureAuthenticated, authorRules(), validate, authorsController.createAuthor);
router.put('/:id',ensureAuthenticated, authorRules(), authorRules(), validate,  authorsController.updateAuthor);
router.delete('/:id',ensureAuthenticated,  authorsController.deleteAuthor);

module.exports = router;

