import React, { useEffect, useState } from 'react'
import "./home.css"
import Search from '../../components/search/search'
import Repository from "../../components/repository/repository"
import { getAccessToken, getAllOrgs, getAllReposByOrg } from '../../lib/api'
import { useLocation } from "react-router-dom"
import Organization from '../../components/organization/organization'


function Home({ saveRepoToFavorites }) {

    // search component containing search only
    // results component showing all repos of a organization searched with an option to save
    // header component showing details of user and navigation to search and saved repos

    const [accessToken, setAccessToken] = useState("")
    const [repos, setRepos] = useState([])
    const [allOrgs, setAllOrgs] = useState([])
    // const [code, setCode] = useState("")

    let { search } = useLocation();

    useEffect(() => {
        // console.log(search.slice(6));
        // setCode(search.slice(6))
        callGetAccessToken()
    }, [search])

    useEffect(() => {
        callGetAllOrgs()
    }, [accessToken])

    const callGetAccessToken = async () => {
        if (search) {
            const accessToken = await getAccessToken(search.slice(6))
            // console.log(accessToken);
            if (typeof accessToken !== "string") {
                alert("token" + accessToken)
            }
            else {
                setAccessToken(accessToken);
            }
        }
    }

    const callGetAllOrgs = async () => {
        if (accessToken) {
            // console.log(accessToken);
            const allOrgs = await getAllOrgs(accessToken)
            if (typeof allOrgs === "string") {
                alert("orgs" + allOrgs)
            }
            else {
                // console.log(allOrgs);
                setAllOrgs(allOrgs);
            }
        }
    }

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
            {search ?
                <>
                    <Search handleClickOnOrg={handleClickOnOrg} />
                    <h1>Orgs</h1>
                    <button onClick={() => callGetAllOrgs()}>Fetch Random GitHub Organizations</button>
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
                                // <span onClick={() => saveRepoToFavorites(repo)}>
                                    <Repository key={repo.id} repo={repo} page="home" favorites={saveRepoToFavorites} />
                                // </span>
                            )
                        })}
                    </div>
                </>
                :
                <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}>Enter</a>
            }
        </div>
    )
}

export default Home
