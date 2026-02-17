require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const connectDB  = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Welcome to the library API');
});

app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email']}));
app.get('/github//callback', passport.authenticate('github',
 {failureRedirect: '/',
successRedirect: '/' 
})
);

app.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/'}),
    (req, res) => {
        console.log('User logged in:', req.user);
        res.redirect('/');
    }
);
(req, res) => {
res.redirect('/');
}
app.get('/logout', (req, res)=> {
    req.logout(() => {
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    res.send(req.user ? `Logged in as ${req.user.displayName}` : 'Not Logged in');
    });

app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));
app.use('/api/publishers', require('./routes/publishers'));
app.use('/api/genres', require('./routes/genres'));

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({message: 'OAuth authentication required'});
};
const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  };
}
if (process.env.NODE_ENV !== 'test') {
    startServer();
}
    
module.exports = app;