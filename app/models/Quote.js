var mongoose = require('mongoose');

var QuoteSchema = new mongoose.Schema({
    author: String,
    text: String
});

module.exports = mongoose.model('Quote', QuoteSchema);
