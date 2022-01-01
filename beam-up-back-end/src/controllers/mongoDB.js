const { ObjectId } = require('mongodb');
require("dotenv").config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const db = mongoose.connection;
db.collection("users");

const userSchema = new mongoose.Schema({
    accessToken: String,
    gitHubOrgs: Array,
    favorites: Array,
    repos: Array
});

const User = mongoose.model('User', userSchema);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => { console.log("Connected successfully to mongo controller") });

const getUserByAccessToken = async (req, res) => {
    const { accessToken } = req.query;
    User.findOne({ accessToken: accessToken }, (err, foundUserById) => {
        if (err) res.status(503).send(`${err}, Error connecting to mongo DB, Please try again`);
        res.status(200).json(foundUserById);
    });
};

const addNewUser = (req, res) => {
    const { accessToken } = req.body;
    User.findOne({ accessToken: accessToken }, async (err, user) => {
        if (err) res.status(503).send(`${err}, Error connecting to mongo DB, Please try again`);
        else if (user) res.status(403).send("user already exit, no need to add again");
        // maybe send the use back with the message
        else if (!user) {
            const newUser = req.body;
            const user = new User(newUser);
            user.save(((err, user) => {
                if (err) res.status(503).send(`${err}, Error connecting to mongo DB, Please try again`);
                else if (!user) res.status(503).send("User addition process failed, Please try again");
                else if (user) res.status(201).json(user);
            }));
        };
    });
};

const updateUser = async (req, res) => {
    const { accessToken } = req.query;
    const {update} = req.body;
    User.findOneAndUpdate({ accessToken: accessToken }, update, { new: true, useFindAndModify: false }, (err, updatedUser) => {
        if (err) res.status(503).send(`${err}, updateUser failed, Please try again`);
        else if (!updatedUser) res.status(503).send("updateUser failed, Please try again");
        else if (updatedUser) res.status(201).json(updatedUser);
    }
    );
};

module.exports = { addNewUser, updateUser, getUserByAccessToken };