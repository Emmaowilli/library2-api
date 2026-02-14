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
    .isISBN(13)
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

    

