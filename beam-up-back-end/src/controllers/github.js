const express = require("express");
const router = express.Router();
const {getAllRepos} = require("../models/github")

router.get('/:org', async (req, res) => {
    const org = req.params.org
    // console.log(org);
    const allRepos = await getAllRepos(org)
    res.send(allRepos)
})

// rethink order of folders: controllers, routes, models, schemas
// consider fetching all/many organizations and presenting them to user
// consider implementing interactive search of organizations

module.exports = router;