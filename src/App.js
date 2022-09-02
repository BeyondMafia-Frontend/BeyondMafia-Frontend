import './App.css';
import NotFound from './components/NotFound.js';
import SignUp from './components/SignUp.js'
import GamePage from './components/MafiaGame/GamePage.js'
import PlayerPage from './components/PlayerPage';
import LobbyPage from './components/LobbyPage.js'
import LoginPage from './components/LoginPage';
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
    <LoginPage/>
    </Route>

	  <Route exact path="/signUp">
	  <SignUp />
	  </Route>


	  <Route exact path="/game/:id">
	  <GamePage />
	  </Route>

	  <Route exact path="/lobby">
	  <LobbyPage />
	  </Route>

  <Route exact path="/players/:id">
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
