import React, {Component} from 'react';
import MafiaHeader from './MafiaHeader.js'
import Announcements from './Announcements.js'
import Leaderboard from './Leaderboard.js'
import Competitive from './Competitive.js'
import Games from './Games.js'
import Footer from './Footer'
import CurrentGame from './CurrentGame.js'
import Cookies from 'universal-cookie';
import * as utils from './utils/image-resolver.js';

class LobbyPage extends Component {
  constructor(props){
    var cookies = new Cookies();
    super(props);
    this.state = {
      playerid : -1,
      cookies : cookies,
      games: []
    }
  }
async componentDidMount(){
  var cookie = this.state.cookies.get('bmcookie');
  if(cookie){
  var rawResponse = await fetch('http://beyondmafia.live/verifyUser',{
      method: 'GET',
      headers:{
        bmcookie: this.state.cookies.get('bmcookie')
      }
    });
    var content = await rawResponse.json();
    if(content.playerid){
    this.setState({playerid:content.playerid});
  }
  }
  else{
    window.location.href = "/"
  }
  var sendJSON = {};
  sendJSON.page = 1;
  rawResponse = await fetch('http://beyondmafia.live/getGames',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        bmcookie: this.state.cookies.get('bmcookie')
      },
      body: JSON.stringify(sendJSON)
    });
     content = await rawResponse.json();
     this.setState({games:content.gameArray});
     this.setState({currentGame:content.currentGame});
};
render(){
  return(
	  <div>
    <div class='header' >
    <a href="/">
    <img
      src="/assets/logo-light.png"
      id="logoLightplayer"
      alt="BeyondMafia"
    />
    </a>
    <a class='nav-links-highlighted'>L O B B Y</a>
    <p class='nav-divider'>|</p>
    <a class='nav-links' href={'/players/'+this.state.playerid.toString()}>P L A Y E R</a>
    <p class='nav-divider'>|</p>
    <a class='nav-links'>R O U N D</a>
    <p class='nav-divider'>|</p>
    <a class='nav-links'>F O R U M</a>
    <p class='nav-divider'>|</p>
    <a class='nav-links' href=''>L E A R N</a>
    <img src="/assets/default-avis/neurondark.png" id="player-pfp" alt="BeyondMafia"/>
    </div>

	      <div className="lobbyPage" style={{display:"flex", backgroundColor:"#efefee", width:"110%","font-family": `Montserrat`}}>

		  <div className="info" style={{display:"flex", flexFlow:"column", gap:"15px",marginLeft:"75px"}}>
		      <Announcements />
		      <div className="divide" style={{paddingTop:'50px'}}>
		      </div>

		      <Leaderboard/ >
		      <div className="divide" style={{paddingTop:'50px'}}>
		      </div>

		      <Competitive />
		  </div>
		  <Games bmcookie={this.state.cookies.get('bmcookie')} playerid={this.state.playerid} games={this.state.games}/>
      <div className="info-right" style={{display:"flex", flexFlow:"column", gap:"15px",marginLeft:"75px"}}>
      <CurrentGame bmcookie={this.state.cookies.get('bmcookie')} playerid={this.state.playerid} currentGame={this.state.currentGame}/>
      </div>
	      </div>

		  <div className="divide" style={{paddingTop:'50px', backgroundColor:"rgb(239, 239, 238)", width:"110%"}}>
		      </div>

		  <Footer />

	  </div>


  );
}
}

export default LobbyPage;
