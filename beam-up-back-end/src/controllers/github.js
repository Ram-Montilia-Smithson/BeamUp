const express = require("express");
const router = express.Router();
const { getAllRepos, getAllOrgs, getAccessToken} = require("../models/github")

router.get('/allOrgs', async (req, res) => {
    const accessToken = req.query.accessToken
    const allOrgs = await getAllOrgs(accessToken)
    // console.log(allOrgs);
    res.send(allOrgs)
})

router.post('/accessToken', async (req, res) => {
    const code = req.body.code
    // console.log(code);
    const { access_token } = await getAccessToken(code)
    // console.log(access_token);
    res.send(access_token)
})


// keep this rout as last
router.get('/:org', async (req, res) => {
    const org = req.params.org
    const accessToken = req.query.accessToken
    // console.log(code);
    const allRepos = await getAllRepos(accessToken, org)
    // console.log(allRepos);
    res.send(allRepos)
})

// rethink order of folders: controllers, routes, models, schemas
// consider fetching all/many organizations and presenting them to user
// consider implementing interactive search of organizations

module.exports = router;