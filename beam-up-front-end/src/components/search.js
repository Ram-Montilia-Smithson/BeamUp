import React, { useState } from 'react'
import { getAllReposByOrg } from '../lib/api'

function Search({ setRepos }) {

    const [search, setSearch] = useState("")

    // test("octo-org")
    const handleOnClick = async (org) => {
        const allRepos = await getAllReposByOrg(org)
        // console.log(allRepos);
        setRepos(allRepos)
    }

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                onClick={() => handleOnClick(search)}
            >
                search
            </button>
        </div>
    )
}

export default Search
