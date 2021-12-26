import React, { useEffect, useState } from 'react'
import Search from '../components/search'
import Repository from "../components/repository"
import { getAccessToken, getAllOrgs, getAllReposByOrg } from '../lib/api'
import { useLocation } from "react-router-dom"
import Organization from '../components/organization'


function Index() {

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
         callGetAccessToken(search.slice(6))
    }, [search])

    useEffect(() => {
        callGetAllOrgs()
    }, [accessToken])

    const callGetAccessToken = async (code) => {
        const accessToken = await getAccessToken(code)
        if (typeof accessToken !== "string") {
            alert("token" + accessToken)
        }
        else {
            // console.log(accessToken);
            setAccessToken(accessToken);
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
        const allRepos = await getAllReposByOrg(accessToken, org)
        if (typeof allRepos === "string") {
            alert("repos" + allRepos)
        }
        else {
            console.log(allRepos);
            setRepos(allRepos)
        }
    }

    return (
        <div>
            <Search handleClickOnOrg={handleClickOnOrg} />
            <h1>Orgs</h1>
            {allOrgs.length && allOrgs.map((org, index) => {
                return (
                    <Organization
                        key={index}
                        org={org}
                    // handleClickOnOrg={handleClickOnOrg}
                    />
                )
            })}
            <h1>Repos</h1>
            {repos.length && repos.map((repo, index) => {
                return (
                    <Repository key={index} repo={repo} />
                )
            })}
        </div>
    )
}

export default Index
