import './App.css';
import Index from './pages';
import Home from './pages/home';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"


function App() {

  // if logged in - transfer to index page
  // if logged out - transfer to login page, presenting sign up and log in buttons that open a modal to enter the website
  // console.log(process.env);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/"> Home </Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/LoggedIn' element={<Index />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
