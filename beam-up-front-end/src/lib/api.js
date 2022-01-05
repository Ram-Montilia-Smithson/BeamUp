import axios from "axios";

export const getAllReposByOrg = async (accessToken, org) => {
    const response = await axios.get(`https://beam-up-back.herokuapp.com/api/github/${org}?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    console.log(response);
    if (response.data.length) return (response.data)
    else return ({ error: "No repositories found" })
}

export const getGitHubOrgs = async (accessToken, org) => {
    let url = `https://beam-up-back.herokuapp.com/api/github/orgs?accessToken=${accessToken}`
    if (org) url += `&org=${org}`
    console.log(url);
    const response = await axios.get(url)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data && response.data.length) return (response.data)
    else return ({ error: "No organizations found" })
}


export const getAccessToken = async (code) => {
    const response = await axios.post('https://beam-up-back.herokuapp.com/api/github/accessToken', {code})
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data.access_token)
    else return ({ error: "No access token generated" })
}
// check addNewUser call and right response
export const addNewUser = async (accessToken) => {
    const response = await axios.post('https://beam-up-back.herokuapp.com/api/mongoDB/newUser', { accessToken })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data.accessToken)
    else return (response)
}
// check updateUser call and right response
export const updateUser = async (accessToken, update) => {
    const response = await axios.put(`https://beam-up-back.herokuapp.com/api/mongoDB/update?accessToken=${accessToken}`, { update })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}

export const getUserByAccessToken = async (accessToken) => {
    const response = await axios.get(`https://beam-up-back.herokuapp.com/api/mongoDB/userInfo?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}