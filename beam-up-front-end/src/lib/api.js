// eventually change url to deployed address instead of http://localhost:5000
import axios from "axios";

// containing all the api calls to the back end server
// should include addUser, updateUser, saveRepo, getUserByEmail and then compare passwords, 

export const getAllReposByOrg = async (accessToken, org) => {
    // console.log("accessToken", accessToken);
    const response = await axios.get(`http://localhost:5000/api/github/${org}?accessToken=${accessToken}`)
        .catch((error) => { return ({ data: `${error}` }) })
    // console.log(response);
    if (response.data) return (response.data)
    else return (response)
}

export const getAllOrgs = async (accessToken) => {
    // console.log("accessToken", accessToken);
    const response = await axios.get(`http://localhost:5000/api/github/allOrgs?accessToken=${accessToken}`)
        .catch((error) => { return ({ data: `${error}` }) })
    // console.log(response);
    if (response.data) return (response.data)
    else return (response)
}


export const getAccessToken = async (code) => {
    const response = await axios.post('http://localhost:5000/api/github/accessToken', {code})
        .catch((error) => { return ({ data: `${error}` }) })
    // console.log(response);
    if (response.data) return (response.data)
    else return (response)
}