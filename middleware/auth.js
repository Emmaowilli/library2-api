const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }
    try {
        const devcoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = devcoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};