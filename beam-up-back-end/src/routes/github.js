const express = require("express");
const router = express.Router();
const { getAllRepos, getAllOrgs, getAccessToken} = require("../controllers/github")

router.get('/allOrgs', getAllOrgs)

router.post('/accessToken', getAccessToken)

// keep this rout as last
router.get('/:org', getAllRepos)

// rethink order of folders: controllers, models
// consider implementing interactive search of organizations

module.exports = router;