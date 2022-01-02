const express = require("express");
const Router = require("express");
const cors = require('cors');
const gitHub = require("./src/routes/github");
const mongoDB = require("./src/routes/mongoDB")
require('dotenv').config()

const app = express()
const port = process.env.Port || 5000

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World!   Welcome to Ram Montilia Smithson's BeamUp home assignment server")
})

const router = Router();

router.use("/github", gitHub);
router.use("/mongoDB", mongoDB)

app.use("/api", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})