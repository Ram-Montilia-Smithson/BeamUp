import './App.css';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import Entrance from './pages/entrance/entrance';
import { addNewUser, getAccessToken, getAllOrgs, getUserByAccessToken, updateUser } from './lib/api';
import qs from "qs";
import { createBrowserHistory } from "history";

function App() {

  // if logged in - transfer to index page
  // if logged out - transfer to login page, presenting sign up and log in buttons that open a modal to enter the website
  // console.log(process.env);


  const [favorites, setFavorites] = useState([])
  const [accessToken, setAccessToken] = useState("")
  const [allOrgs, setAllOrgs] = useState([])

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
    if (accessToken) {
      console.log(accessToken);
      getInfoAfterRefresh(accessToken)
    }
  }, [accessToken])

  const getInfoAfterRefresh = async (accessToken) => {
    const data = await getUserByAccessToken(accessToken)
    if (typeof data === "object") {
      if(!favorites.length) setFavorites(data.favorites)
      if(!allOrgs.length) setAllOrgs(data.allOrgs)
    }
    else {
      alert("refresh" + data)
      console.log(data);
    }
  }

  const callGetAccessToken = async (code) => {
    // console.log(code);
    const accessToken = await getAccessToken(code)
    if (typeof accessToken === "string") {
      setAccessToken(accessToken);
      history.push(`/home?accessToken=${accessToken}`)
      callGetAllOrgs(accessToken)
      addNewUser(accessToken)
    }
    else {
      alert("token" + accessToken)
      console.log(accessToken);
    }
  }

  const callGetAllOrgs = async (accessToken) => {
    if (accessToken) {
      // console.log(accessToken);
      const allOrgs = await getAllOrgs(accessToken)
      if (typeof allOrgs === "string") {
        alert("orgs" + allOrgs)
      }
      else {
        // console.log(allOrgs);
        setAllOrgs(allOrgs);
        callUpdateUser(accessToken, {allOrgs, favorites})
      }
    }
  }

  const callUpdateUser = async (accessToken, update) => {
    const data = await updateUser(accessToken, update)
    if (typeof data === "object") {
      if (!favorites.length) setFavorites(data.favorites)
      if (!allOrgs.length) setAllOrgs(data.allOrgs)
    }
    else {
      alert("update" + data)
      console.log(data);
    }
  }

  // find better name
  const addingToOrRemovingFromFavorites = (repo) => {
    const newFavorites = favorites.filter(favorite => favorite.name !== repo.name)
    if (newFavorites.length === favorites.length) {
      setFavorites([...favorites, repo])
      updateUser(accessToken, { allOrgs, favorites: [...favorites, repo] })
    }
    else {
      setFavorites(newFavorites)
      updateUser(accessToken, { allOrgs, favorites: newFavorites })
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
            </>
          }
        </nav>
        <Routes>
          <Route path="/favorites" element={<Favorites favorites={favorites} addingToOrRemovingFromFavorites={addingToOrRemovingFromFavorites} />} />
          <Route path='/home' element={<Home
            addingToOrRemovingFromFavorites={addingToOrRemovingFromFavorites}
            // setAccessToken={setAccessToken}
            accessToken={accessToken}
            // setAllOrgs={setAllOrgs}
            allOrgs={allOrgs}
            callGetAllOrgs={callGetAllOrgs}
          />} />
          <Route path="/" element={<Entrance />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
