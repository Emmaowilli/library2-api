const express = require('express')
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const publishersController = require('../controllers/publishersController');
const { publisherRules, validate } = require('../middleware/validate');

router.get('/',ensureAuthenticated, publishersController.getAllPublishers );
router.post('/', ensureAuthenticated, publisherRules(), validate, publishersController.createPublisher);
router.get('/:id',ensureAuthenticated, publishersController.getPublisherById );
router.put('/:id',ensureAuthenticated, publishersController.updatePublisher );
router.delete('/:id',ensureAuthenticated, publishersController.deletePublisher );

module.exports = router;

