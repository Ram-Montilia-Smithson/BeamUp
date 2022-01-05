import axios from "axios";

const URL = "https://beam-up-back.herokuapp.com/api"

export const getAllReposByOrg = async (accessToken, org) => {
    const response = await axios.get(`${URL}/github/${org}?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data.length) return (response.data)
    else return ({ error: "No repositories found" })
}

export const getGitHubOrgs = async (accessToken, org) => {
    let orgURL = `${URL}/github/orgs?accessToken=${accessToken}`
    if (org) orgURL += `&org=${org}`
    const response = await axios.get(orgURL)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (Array.isArray(response.data) ? response.data : [response.data])
    else return ({ error: "No organizations found" })
}

export const getAccessToken = async (code) => {
    const response = await axios.post(`${URL}/github/accessToken`, { code })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data && response.data.access_token) return (response.data.access_token)
    else if (response.data && !response.data.access_token) return ({ noError: "not an error" })

    else return ({ error: "No access token generated" })
}

export const addNewUser = async (accessToken) => {
    const response = await axios.post(`${URL}/mongoDB/newUser`, { accessToken })
        .catch((error) => { return ({ error: `${error}` }) })
    if (!response.data) return ({ error: "new user was not saved in DB, Please log out and enter again" })
}

export const updateUser = async (accessToken, update) => {
    const response = await axios.put(`${URL}/mongoDB/update?accessToken=${accessToken}`, { update })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return ({ error: "error in updating the user, please try again" })
}

export const getUserByAccessToken = async (accessToken) => {
    const response = await axios.get(`${URL}/mongoDB/userInfo?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else if (response.data === null) return ({ noError: "not an error" })
    else return ({ error: "error in getting the user's information back, please try again" })
}