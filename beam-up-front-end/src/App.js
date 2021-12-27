import './App.css';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useState } from 'react';


function App() {

  // if logged in - transfer to index page
  // if logged out - transfer to login page, presenting sign up and log in buttons that open a modal to enter the website
  // console.log(process.env);

  const [favorites, setFavorites] = useState([])

  // find better name
  const saveRepoToFavorites = (repo) => {
    const newFavorites = favorites.filter(favorite => favorite.name !== repo.name)
    if (newFavorites.length === favorites.length) setFavorites([...favorites, repo])
    else setFavorites(newFavorites)
  }

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/favorites" element={<Favorites favorites={favorites} saveRepoToFavorites={saveRepoToFavorites}/>}/>
          <Route path='/' element={<Home saveRepoToFavorites={saveRepoToFavorites} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
