import React from 'react'
import "./home.css"
import Search from '../../components/search/search'
import Repository from "../../components/repository/repository"
import Organization from '../../components/organization/organization'

function Home({ changeFavorites, accessToken, gitHubOrgs, callGetGitHubOrgs, repos, callGetAllRepos }) {

    return (
        <div>
            <Search callGetAllRepos={callGetAllRepos} />
            <h1>Orgs</h1>
            <button onClick={() => callGetGitHubOrgs(accessToken)}>Fetch Random GitHub Organizations</button>
            <div id="organizations">
                {gitHubOrgs.length && gitHubOrgs.map(org => {
                    return (
                        <Organization
                            key={org.id}
                            org={org}
                            callGetAllRepos={callGetAllRepos}
                        />
                    )
                })}
            </div>
            <h1>Repos</h1>
            <div id="repositories">
                {repos.length && repos.map(repo => {
                    return (
                        <Repository
                            key={repo.id}
                            repo={repo}
                            changeFavorites={changeFavorites}
                            page={"home"}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home
