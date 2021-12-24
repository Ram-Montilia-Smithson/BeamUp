const axios = require("axios")

const getAllRepos = async (org) => {
    const response = await axios.get(`https://api.github.com/orgs/${org}/repos`)
        .catch((error) => { return ({ data: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}

module.exports = { getAllRepos }