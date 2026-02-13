const { body, validationResult } = require('express-validator');

const authorRules =() => {
    return [
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
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    authorRules,
    validate
};