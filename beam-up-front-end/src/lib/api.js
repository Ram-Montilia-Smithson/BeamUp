// eventually change url to deployed address instead of http://localhost:5000
import axios from "axios";

// containing all the api calls to the back end server
// should include addUser, updateUser, saveRepo, getUserByEmail and then compare passwords, 

export const getAllReposByOrg = async (org) => {
    // console.log(org);
    const response = await axios.get(`http://localhost:5000/api/github/${org}`)
        .catch((error) => { return ({ data: `${error}` }) })
    // console.log(response);
    if (response.data) return (response.data)
    else return (response)
}