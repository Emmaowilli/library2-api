const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: { type: 'String', required: true, unique: true },
    founderyear: { type: 'Number' },
    country: { type: 'string'},
    description: { type: 'String' },
    isActive: { type: 'boolean', default: true},
    createdAt: {type: 'date', default: Date.now}
});

module.exports = mongoose.model('Publisher', publisherSchema);