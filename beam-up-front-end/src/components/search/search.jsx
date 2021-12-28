import React, { useEffect, useState } from 'react'

function Search({ handleClickOnOrg }) {

    // search component containing only the search
    // handling errors of search

    const [orgName, setOrgName] = useState("")

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
