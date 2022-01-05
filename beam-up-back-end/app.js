import express from "express";
import Router from "express";
import cors from "cors";
import gitHub from "./src/routes/github";
import mongoDB from "./src/routes/mongoDB";
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World! Welcome to Ram Montilia Smithson's BeamUp home assignment server")
})

const router = Router();

router.use("/github", gitHub);
router.use("/mongoDB", mongoDB)

app.use("/api", router);

app.listen(port, () => {
    console.log(`Example app listening at https://beam-up-back.herokuapp.com/:${port}`)
})