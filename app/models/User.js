var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    profileUrl: String,
    photoUrl: String,
    zenLevel: Number
});

module.exports = mongoose.model('User', UserSchema);