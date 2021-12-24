import React, { useState } from 'react'
import Search from '../components/search'
import Repository from "../components/repository"

function Index() {

    // search component containing search only
    // results component showing all repos of a organization searched with an option to save
    // header component showing details of user and navigation to search and saved repos
    // add react router

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
