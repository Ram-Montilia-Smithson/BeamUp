const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
    id: Number,
    name: String,
    owner: { id: Number, login: String },
    description: String,
    size: Number,
    language: String,
    userDescription: String
});

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo

// rethink if necessary