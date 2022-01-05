const express = require('express');
const router = express.Router();
const { getAllRepos, getOrgs, getAccessToken} = require("../controllers/github")

router.get('/orgs', getOrgs)

router.post('/accessToken', getAccessToken)

router.get('/:org', getAllRepos)

module.exports = router;