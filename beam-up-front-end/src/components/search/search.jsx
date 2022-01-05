import React, { useState } from 'react'

function Search({ callGetAllRepos }) {

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
                disabled={!orgName}
                onClick={() => callGetAllRepos(orgName)}
            >
                search
            </button>
        </div>
    )
}

export default Search
