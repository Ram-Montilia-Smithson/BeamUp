const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: Boolean,
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: String,
    savedRepos: Array
});

const User = mongoose.model('User', userSchema);

module.exports = User