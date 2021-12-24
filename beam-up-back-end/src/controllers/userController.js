const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const db = mongoose.connection;
const User = require("../schemas/userSchema");
require("dotenv").config();
db.collection("users");


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set('useCreateIndex', true);


db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => { console.log("Connected successfully user controller") });


const login = async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, async (err, user) => {
        if (err) res.status(503).send(`${err}, Error connecting to mongo DB, Please try again`);
        else if (!user) res.status(404).send('Cannot find user based on this email, Please try again');
        else if (user) {
            if (password === user.password) {
                res.status(200).json(user);
            }
            else res.status(404).send('Incorrect email or password');
        };
    });
};

const addNewUser = (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }, async (err, user) => {
        if (err) res.status(503).send(`${err}, Error connecting to mongo DB, Please try again`);
        else if (user) res.status(403).send("Email already in use by another user, Please try with a different email");
        else if (!user) {
            const newUser = req.body;
            const user = new User(newUser);
            user.save(((err, user) => {
                if (err) res.status(503).send(`${err}, Error connecting to mongo DB, Please try again`);
                else if (!user) res.status(503).send("User addition precess failed, Please try again");
                else if (user) {
                    res.status(201).json(user);
                };
            }));
        };
    });
};

// add updateUser or saveRepos

module.exports = { addNewUser, login };