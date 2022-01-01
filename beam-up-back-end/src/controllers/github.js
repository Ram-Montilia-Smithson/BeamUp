const axios = require("axios")

const getAllRepos = async (req, res) => {
    const {org} = req.params
    const {accessToken} = req.query
    const headers = { Authorization: `token ${accessToken}` }
    const response = await axios.get(`https://api.github.com/orgs/${org}/repos?`, { headers: headers })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) res.send(response.data)
    else res.status(500).send(`error: ${response}`)
}

const getOrgs = async (req, res) => {
    const {accessToken} = req.query
    const headers = { Authorization: `token ${accessToken}` }
    const organizationID = Math.random() * 90000000
    const response = await axios.get(`https://api.github.com/organizations?since=${organizationID}`, { headers: headers })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) res.send(response.data)
    else res.status(500).send(`error: ${response}`)
}

const getAccessToken = async (req, res) => {
    const {code} = req.body
    const headers = { Accept: 'application/json' }
    const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`, {}, { headers: headers })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) res.send(response.data)
    else res.status(500).send(`error: ${response}`)
}

module.exports = { getAllRepos, getOrgs, getAccessToken }