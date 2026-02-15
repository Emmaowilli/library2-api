const { body, validationResult } = require('express-validator');

exports.authorRules = () => [
    
        body('firstName') 
        .trim()
        .notEmpty()
        .withMessage('FireName is required'),
       body('lastName')
       .trim()
       .notEmpty()
       .withMessage('lastName is required'),

       body('birthDate')
       .optional()
       .isISO8601()
       .toDate()
       .withMessage('Birth date must be a valid ISO date (YYYY-MM-DD'),
    ];

    //-Book validation Rules------------
    exports.bookRules = () => [
        body('title')
         .trim()
       .notEmpty()
       .withMessage('Title is required'),

       body('authorId')
       .isMongoId()
       .withMessage('Valid MongoDB author ID is required'),

       body('year')
       .isInt({min: 1000, max: new Date().getFullYear() + 5 })
       .withMessage('Year must be a valid number between 1000 and current year + 5'),

    body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required'),

    body('pages')
    .isInt({ min: 1})
    .withMessage('pages must be a positive integer'),
    body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Publisher is required'),
    
    body('isbn')
    .trim()
    .notEmpty()
    .withMessage('ISBN is required'),

    body('place')
    .trim()
    .notEmpty()
    .withMessage('Place/location is required'),

  body('language')
    .trim()
    .notEmpty()
    .withMessage('Language is required'),
];
exports.publisherRules = () => [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('foundedYear').optional().isInt({ min: 1400 }).withMessage('Invalid founded year'),
  
];
exports.genreRules = () => [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Genre name is required'),
  body('description')
    .optional()
    .trim(),
  body('popularityScore')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Popularity score must be between 0 and 100'),
  body('parentGenre')
    .optional()
    .trim(),
  body('booksCount')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Books count must be a non-negative integer')
];
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  next();
};

    
