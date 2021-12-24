const express = require("express");
const Router = require("express");
const cors = require('cors');
const gitHub = require("./src/controllers/github");

const app = express()
const port = process.env.Port || 5000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const router = Router();

router.use("/github", gitHub);

app.use("/api", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// arrange order of folders, import here only routes