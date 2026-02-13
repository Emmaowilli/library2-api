require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const connectDB  = require('./db/connect');
const passport = require('passport');
require('./config/passport');

const app = express();

app.use(cors());
app.use(express.json());
const session = require('express-session');
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
app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the MongonDB:', error.message);
    process.exit(1);
});
        