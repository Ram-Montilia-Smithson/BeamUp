import './App.css';
import Index from './pages';

function App() {

  // if logged in - transfer to index page
  // if logged out - transfer to login page, presenting sign up and log in buttons that open a modal to enter the website
  // add react router

  return (
    <div className="App">
      <Index/>
    </div>
  );
}

export default App;
