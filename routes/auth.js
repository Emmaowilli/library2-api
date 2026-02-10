const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

const router = express.Router();

// Register a new user
router.post('/register', [
    body('username'). trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
);

router.post(
    '/login', 
    [
        body('email').trim().isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
   async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await User . findOne ({email});
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials'});
      }

      const token = jwt.sign(
        {userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h'  }
      );
      res.status(200).json({ token });
    }
    catch (error) {
        console.error('LOGIN ERROR DETAILS:', error);
        console.error('FULL STACK:', error.stack);
        res.status(500).json({ message: 'server error'});
    }
   } 
);

module.exports = router;

