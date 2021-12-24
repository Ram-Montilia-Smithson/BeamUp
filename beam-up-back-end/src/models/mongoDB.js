const { MongoClient } = require('mongodb');
require("dotenv").config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("github").collection("users");
    // perform actions on the collection object

    client.close();
});

// rethink if necessary