const express = require("express");
const router = express.Router();
const axios = require("axios")

const test = async () => {
    const response = await axios.get('https://api.github.com/orgs/octo-org/repos')
        .catch((error) => { return ({ data: `${error}` }) })
    console.log(response);
    if (response.data) return (response.data)
    else return (response)
}

router.get('/', async (req, res) => {
    res.send(await test())
})

module.exports = router;