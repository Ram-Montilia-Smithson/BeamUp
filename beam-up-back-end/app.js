const express = require("express");
const Router = require("express");
const cors = require('cors');
const gitHub = require("./src/controllers/github");

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

const router = Router();

router.use("/github", gitHub);

app.use("/api", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})