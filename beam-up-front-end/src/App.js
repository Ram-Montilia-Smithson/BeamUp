import { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home';
import Favorites from './pages/favorites';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { addNewUser, getAccessToken, getAllReposByOrg, getGitHubOrgs, getUserByAccessToken, updateUser } from './lib/api';
import qs from "qs";
import { createBrowserHistory } from "history";
import Nav from "react-bootstrap/Nav"
import Index from './pages';


function App() {

  // deploy front

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
  });

  useEffect(() => {
    if (accessToken) getInfoAfterRefresh(accessToken)
  }, [accessToken])

  const callGetAccessToken = async (code) => {
    const accessToken = await getAccessToken(code)
    if (accessToken && accessToken.error) alert(accessToken.error)
    else if (accessToken.noError) return
    else {
      setAccessToken(accessToken);
      history.push(`/home?accessToken=${accessToken}`)
      callGetGitHubOrgs(accessToken)
      const newUser = await addNewUser(accessToken)
      if (newUser && newUser.error) alert(newUser.error)
    }
  }

  const getInfoAfterRefresh = async (accessToken) => {
    const data = await getUserByAccessToken(accessToken)
    if (data.error) alert(data.error)
    else {
      if (data.favorites) setFavorites(data.favorites)
      if (data.gitHubOrgs) setGitHubOrgs(data.gitHubOrgs)
      if (data.repos) setRepos(data.repos)
    }
  }

  const callUpdateUser = async (accessToken, update) => {
    const data = await updateUser(accessToken, update)
    if (data.error) alert(data.error)
    else {
      if (data.favorites) setFavorites(data.favorites)
      if (data.gitHubOrgs) setGitHubOrgs(data.gitHubOrgs)
      if (data.repos) setRepos(data.repos)
    }
  }

  const callGetGitHubOrgs = async (accessToken, org, newRepos) => {
    const gitHubOrgs = await getGitHubOrgs(accessToken, org)
    if (gitHubOrgs.error) alert(gitHubOrgs.error)
    else {
      setGitHubOrgs(gitHubOrgs);
      callUpdateUser(accessToken, { gitHubOrgs: gitHubOrgs, favorites, repos: newRepos ? newRepos : repos })
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
    if (repos.error) alert(repos.error)
    else {
      setRepos(repos)
      callGetGitHubOrgs(accessToken, org, repos)
    }
  }

  return (
    <div className="App">
      <Router>
        {accessToken &&
          <Nav fill variant="tabs">
            <Nav.Item>
              <Link to={`/home?accessToken=${accessToken}`}> Home </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={`/favorites?accessToken=${accessToken}`}>Favorites</Link>
            </Nav.Item>
            <Nav.Item>
              <Link onClick={() => setAccessToken("")} to={"/"}>LogOut</Link>
            </Nav.Item>
          </Nav>
        }
        <Routes>
          <Route path="/favorites" element={<Favorites
            favorites={favorites}
            changeFavorites={changeFavorites}
          />} />

          <Route path='/home' element={<Home
            favorites={favorites}
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
