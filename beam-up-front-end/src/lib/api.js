// eventually change url to deployed address instead of http://localhost:5000
import axios from "axios";

export const test = async () => {
    const response = await axios.get('http://localhost:5000/api/github')
        .catch((error) => { return ({ data: `${error}` }) })
    console.log(response);
    if (response.data) return (response.data)
    else return (response)
}