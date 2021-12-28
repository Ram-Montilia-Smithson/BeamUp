import React, { useEffect, useState } from 'react'
import "./home.css"
import Search from '../../components/search/search'
import Repository from "../../components/repository/repository"
import { getAccessToken, getAllOrgs, getAllReposByOrg } from '../../lib/api'
import Organization from '../../components/organization/organization'


function Home({ addingToOrRemovingFromFavorites, accessToken, allOrgs, callGetAllOrgs }) {

    // results component showing all repos of a organization searched with an option to save

    const [repos, setRepos] = useState([])

    const handleClickOnOrg = async (org) => {
        // console.log(org);
        const allRepos = await getAllReposByOrg(accessToken, org)
        if (typeof allRepos === "string") {
            alert("repos" + allRepos)
        }
        else {
            // console.log(allRepos);
            setRepos(allRepos)
        }
    }

    return (
        <div>
            <Search handleClickOnOrg={handleClickOnOrg} />
            <h1>Orgs</h1>
            <button onClick={() => callGetAllOrgs(accessToken)}>Fetch Random GitHub Organizations</button>
            <div id="organizations">
                {allOrgs.length && allOrgs.map(org => {
                    return (
                        <Organization
                            key={org.id}
                            org={org}
                            handleClickOnOrg={handleClickOnOrg}
                        />
                    )
                })}
            </div>
            <h1>Repos</h1>
            <div id="repositories">
                {repos.length && repos.map(repo => {
                    return (
                        // when adding a repo to favorites, text of button needs to change
                        <Repository key={repo.id} repo={repo} page="home" addingToOrRemovingFromFavorites={addingToOrRemovingFromFavorites} />
                    )
                })}
            </div>
        </div>
    )
}

export default Home
