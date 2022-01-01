import { useEffect, useState } from 'react';
import './App.css';
import Index from './pages/index';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { addNewUser, getAccessToken, getAllReposByOrg, getGitHubOrgs, getUserByAccessToken, updateUser } from './lib/api';
import qs from "qs";
import { createBrowserHistory } from "history";

function App() {

  // fix favorites button
  // work on CSS
  // deploy
  // consider implementing interactive search of organizations
  // check responses from API calls, if it all makes sense, both to server and to github
  // in addUser in the server, maybe send the user info back with the message, if user already exist
  // consider changing api.js functions, they are quite repetitive
  // when repo is pressed, it needs to show a modal with more info and an option for adding a short description by the user

  const [favorites, setFavorites] = useState([])
  const [accessToken, setAccessToken] = useState("")
  const [gitHubOrgs, setGitHubOrgs] = useState([])
  const [repos, setRepos] = useState([])

  const history = createBrowserHistory();

  useEffect(() => {
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.code) {
      callGetAccessToken(filtersFromParams.code);
    }
    if (filtersFromParams.accessToken) {
      setAccessToken(filtersFromParams.accessToken)
    }
  }, []);

  useEffect(() => {
    getInfoAfterRefresh(accessToken)
  }, [accessToken])

  const callGetAccessToken = async (code) => {
    const accessToken = await getAccessToken(code)
    if (typeof accessToken === "string") {
      setAccessToken(accessToken);
      history.push(`/home?accessToken=${accessToken}`)
      callGetGitHubOrgs(accessToken)
      addNewUser(accessToken)
    }
    else alert("token" + accessToken)
  }

  const getInfoAfterRefresh = async (accessToken) => {
    const data = await getUserByAccessToken(accessToken)
    if (typeof data === "object") {
      if (data.favorites) setFavorites(data.favorites)
      if (data.gitHubOrgs) setGitHubOrgs(data.gitHubOrgs)
      if (data.repos) setRepos(data.repos)
    }
    else alert("refresh" + data)
  }

  const callUpdateUser = async (accessToken, update) => {
    const data = await updateUser(accessToken, update)
    if (typeof data === "object") {
      if (data.favorites) setFavorites(data.favorites)
      if (data.gitHubOrgs) setGitHubOrgs(data.gitHubOrgs)
      if (data.repos) setRepos(data.repos)
    }
    else alert("update" + data)
  }

  const callGetGitHubOrgs = async (accessToken) => {
    const gitHubOrgs = await getGitHubOrgs(accessToken)
    if (typeof gitHubOrgs === "string") alert("orgs" + gitHubOrgs)
    else {
      setGitHubOrgs(gitHubOrgs);
      callUpdateUser(accessToken, { gitHubOrgs: gitHubOrgs, favorites, repos })
    }
  }

  const changeFavorites = (repo) => {
    let newFavorites = favorites.filter(favorite => favorite.name !== repo.name)
    if (newFavorites.length === favorites.length) {
      newFavorites = [...favorites, repo]
    }
    setFavorites(newFavorites)
    callUpdateUser(accessToken, { gitHubOrgs, favorites: newFavorites, repos })
  }

  const callGetAllRepos = async (org) => {
    const repos = await getAllReposByOrg(accessToken, org)
    if (typeof repos === "string") alert("repos" + repos)
    else {
      setRepos(repos)
      callUpdateUser(accessToken, { gitHubOrgs, favorites, repos: repos })
    }
  }

  return (
    <div className="App">
      <Router>
        <nav>
          {accessToken &&
            <>
              <Link to={`/home?accessToken=${accessToken}`}> Home </Link>
              <Link to={`/favorites?accessToken=${accessToken}`}>Favorites</Link>
              {/* <Link to={"/"}>LogOut or something</Link>  */}
            </>
          }
        </nav>
        <Routes>
          <Route path="/favorites" element={<Favorites
            favorites={favorites}
            changeFavorites={changeFavorites}
          />} />

          <Route path='/home' element={<Home
            changeFavorites={changeFavorites}
            accessToken={accessToken}
            gitHubOrgs={gitHubOrgs}
            favorites={favorites}
            callGetGitHubOrgs={callGetGitHubOrgs}
            callGetAllRepos={callGetAllRepos}
            repos={repos}
          />} />

          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
