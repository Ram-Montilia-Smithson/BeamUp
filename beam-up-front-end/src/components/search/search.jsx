import React, { useEffect, useState } from 'react'
// import { getAllReposByOrg } from '../lib/api'
// import { useLocation } from "react-router-dom"

function Search({ setRepos, handleClickOnOrg }) {

    // search component containing only the search
    // handling errors of search

    // let { search } = useLocation();

    const [orgName, setOrgName] = useState("")

    // search.slice(6)

    return (
        <div>
            <label>Search a GitHub organization and see all it's repositories below</label>
            <label>Or choose one from of the list below</label>
            <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
            />
            <button
                onClick={() => handleClickOnOrg(orgName)}
            >
                search
            </button>
        </div>
    )
}

export default Search
