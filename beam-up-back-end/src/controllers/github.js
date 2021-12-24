const express = require("express");
const router = express.Router();
const {getAllRepos} = require("../models/github")

router.get('/:org', async (req, res) => {
    const org = req.params.org
    // console.log(org);
    const allRepos = await getAllRepos(org)
    res.send(allRepos)
})

module.exports = router;