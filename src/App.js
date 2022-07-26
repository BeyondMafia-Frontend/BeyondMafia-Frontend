import './App.css';
import NotFound from './components/NotFound.js';
import SignUp from './components/SignUp.js'
import GamePage from './components/MafiaGame/GamePage.js'
import PlayerPage from './components/PlayerPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withRouter } from "react-router";


function App() {
  return (
    <div>
    <Router>
    <Switch>

    <Route exact path="/">
    <div className="App">
	<div>
    <Link to="/signUp"> Sign Up! </Link>
	</div>
	<div>
	<Link to="/game"> Game Page! </Link>
	</div>
  <div>
	<Link to="/player"> Player Page! </Link>
	</div>
    </div>
    </Route>

    <Route exact path="/signUp">
    <SignUp />
    </Route>
	
	<Route exact path="/game">
	<GamePage />
	</Route>

  <Route exact path="/player">
	<PlayerPage />
	</Route>


    <Route path='*'>
    <NotFound />
    </Route>


    </Switch>
    </Router>
    </div>
  );
}

export default App;
