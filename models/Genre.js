const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: "string",
    trim: true
  },
  popularityScore: {
    type: "number",
    default: 0,
    min: 0,
    max: 100
  },
  parentGenre: {
    type: "string",
    default: null
  },
  booksCount: {
    type: "number",
    default: 0
  },
  createdAt: {
    type: "date",
    default: Date.now
  }
});

module.exports = mongoose.model('Genre', genreSchema);