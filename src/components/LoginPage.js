import React, {Component} from 'react';
import { withRouter } from "react-router";
import logo from '../assets/logo-light.png';
import '../css/PlayerPage.css'
import playerpic from '../assets/default-avis/neuron dark.png';
import msg from '../assets/msg.png'
import loginHeader from '../assets/login_header.png'
import playButton from '../assets/playMafia.png'
import '../css/Login.css'

class LogIn extends Component {
    constructor(props){
      super(props);
        this.state = {
            playerid : -1
        }
    }
  
    render(){
    return(
        <div class='login_container'>
        <div class='header'>
        <img
			    src={logo}
			    id="logoLightplayer"
			    alt="BeyondMafia"

		    />
        <a class='nav-links'href='/lobby'>L O B B Y</a>
        <p class='nav-divider'>|</p>
        {parseInt(this.state.playerid) === parseInt(this.state.currentId)
        ?
        <a class='nav-links-highlighted'>P L A Y E R</a>
        : this.state.playerid === -1
          ?<a class='nav-links'>P L A Y E R</a>
          :<a class='nav-links' href={'/players/'+this.state.playerid.toString()}>P L A Y E R</a>
        }
        <p class='nav-divider'>|</p>
        <a class='nav-links'>R O U N D</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links' >F O R U M</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links'>L E A R N</a>
        <img src={playerpic} id="player-pfp" alt="BeyondMafia"/>
        </div>
        <div class="splash">
            <img src={loginHeader}alt="login pic"/>

        </div>
        <div class="play">
        <img src={playButton} alt="play mafia button"/>
        <p> BeyondMafia is the mafia site that is revolutionary in design, safety, 
        and has a thriving community of users from all walks of life all over the world. 
        With competitive and casual chat and forum mafia, and other gamemodes like survivor, 
        you're sure to find something that suits how YOU want to play!</p>
        </div>
        <button id="login">LOG IN</button>


        </div>
      );
    }
  }
  
  export default LogIn;
  
