const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const authorsController = require('../controllers/authorsController');

router.get('/', auth, authorsController.getAllAuthors);
router.get('/:id', auth,  authorsController.getAuthorById);
router.post('/', auth, authorsController.createAuthor);
router.put('/:id', auth,  authorsController.updateAuthor);
router.delete('/:id', auth,  authorsController.deleteAuthor);

module.exports = router;
