const axios = require("axios")

const getAllRepos = async (accessToken, org) => {
    // console.log("accessToken", accessToken);
    const headers = { Authorization: `token ${accessToken}` }
    const response = await axios.get(`https://api.github.com/orgs/${org}/repos?`, { headers: headers })
        .catch((error) => { return ({ data: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}

const getAllOrgs = async (accessToken) => {
    // ?per_page=100
    // ?since=135000
    // console.log("accessToken", accessToken);
    const headers = { Authorization: `token ${accessToken}` }
    const organizationID = Math.random() * 90000000
    const response = await axios.get(`https://api.github.com/organizations?since=${organizationID}`, { headers: headers })
        .catch((error) => { return ({ data: `${error}` }) })
    // console.log(response);
    if (response.data) return (response.data)
    else return (response)
}

const getAccessToken = async (code) => {
    const headers = {Accept: 'application/json'}
    const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`, {}, { headers: headers })
        .catch((error) => { return ({ data: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}

module.exports = { getAllRepos, getAllOrgs, getAccessToken }