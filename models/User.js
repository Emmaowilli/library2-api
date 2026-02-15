const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    googleId: {
        type: String,
         unique: true,
        sparse: true
    },
    username: {
        type: String,
        required: true,
    },
    displayName: {
       type: String,
    },
    email: { type: String,
       sparse: true  
    },
    password: { type: String,  
       sparse: true},
       createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);