const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const oauthAuth = require('../middleware/oauthAuth');
const { body } = require('express-validator');
const {authorRules, validate } = require('../middleware/validate');

const authorsController = require('../controllers/authorsController');
router.get('/', auth, authorsController.getAllAuthors);
router.get('/:id', auth,  authorsController.getAuthorById);
router.post('/', oauthAuth, auth, authorRules(), validate, authorsController.createAuthor);
router.put('/:id', oauthAuth, auth, authorRules(), validate,  authorsController.updateAuthor);
router.delete('/:id', oauthAuth, auth,  authorsController.deleteAuthor);

module.exports = router;
