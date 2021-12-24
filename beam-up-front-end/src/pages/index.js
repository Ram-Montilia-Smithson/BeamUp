import React, { useState } from 'react'
import Search from '../components/search'
import Repository from "../components/repository"

function Index() {

    const [repos, setRepos] = useState([])

    return (
        <div>
            <Search setRepos={setRepos}/>
            {repos.length && repos.map((repo, index) => {
                return (
                    <Repository key={index} repo={repo}/>
                )
            })}
        </div>
    )
}

export default Index
