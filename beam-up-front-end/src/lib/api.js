import axios from "axios";

export const getAllReposByOrg = async (accessToken, org) => {
    const response = await axios.get(`http://localhost:5000/api/github/${org}?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}

export const getGitHubOrgs = async (accessToken) => {
    const response = await axios.get(`http://localhost:5000/api/github/orgs?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}


export const getAccessToken = async (code) => {
    const response = await axios.post('http://localhost:5000/api/github/accessToken', {code})
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data.access_token)
    else return (response)
}

export const addNewUser = async (accessToken) => {
    const response = await axios.post('http://localhost:5000/api/mongoDB/newUser', { accessToken })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data.accessToken)
    else return (response)
}

export const updateUser = async (accessToken, update) => {
    const response = await axios.put(`http://localhost:5000/api/mongoDB/update?accessToken=${accessToken}`, { update })
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}

export const getUserByAccessToken = async (accessToken) => {
    const response = await axios.get(`http://localhost:5000/api/mongoDB/userInfo?accessToken=${accessToken}`)
        .catch((error) => { return ({ error: `${error}` }) })
    if (response.data) return (response.data)
    else return (response)
}