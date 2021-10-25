import './App.css';
import LandingPage from './components/landing-page/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterDonor from './components/register-donor/RegisterDonor';
import SearchDonor from './components/search-donor/SearchDonor';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/register-donor' component={RegisterDonor} />
          <Route path='/search' component={SearchDonor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
