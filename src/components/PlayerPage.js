import React, {Component} from 'react';
import logo from '../assets/logo-light.png';
import '../css/PlayerPage.css'
import playerpic from '../assets/default-avis/neuron dark.png';
import msg from '../assets/msg.png'

class PlayerPage extends Component {
  constructor(props){
    super(props);
      this.state = {
      }
  }

  render(){
  return(
    
    <div class='container'>
        <div class='header'>
        <img 
			    src={logo}
			    id="logoLightplayer"
			    alt="BeyondMafia"
          
		    />
        <a class='nav-links'href=''>L O B B Y</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links'href=''>P L A Y E R</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links' href=''>R O U N D</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links' href=''>F O R U M</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links' href=''>L E A R N</a>
        <img src={playerpic} id="player-pfp" alt="BeyondMafia"/>
        </div>
        <div class='banner'></div>
        <div class='user-banner'>
            <p class='user-name'>username</p>
            <div class='user-banner-bot'>
            </div>
        </div>
        <div class='msg-bar'>
          <img src={msg} id='msg' alt="msg"/>
          <p>Message</p>
        </div>
        
        <div class='bar-left'>Shoutbox</div>
        <div class='bar-right'>Collections</div>
        <div class='bio-box'>bio</div>
        <div class='shout-chat'>shout chat..</div>
        <div class='collect-content'>collections content</div>
        <div class='bar-left'>friends</div>
        <div class='bar-right'>Favs</div>
        <div class='friends-content'>my friends</div>
        <div class='favs-content'> my Favs</div>
        <div class='stat-bar'> USER STATS</div>
        <div class='stat-content'> USER STATS</div>
        <img src={playerpic} id='profile' alt='banner profile'/> 


    

    </div>
  );
  }
}

export default PlayerPage;
