import React, {Component} from 'react';
import { withRouter } from "react-router";
import logo from '../assets/logo-light.png';
import '../css/PlayerPage.css'
import playerpic from '../assets/default-avis/neuron dark.png';
import msg from '../assets/msg.png'
import Cookies from 'universal-cookie';
class PlayerPage extends Component {
  constructor(props){
    var cookies = new Cookies();
    super(props);
      this.state = {
        cookies: cookies,
        playerid : -1
      }
  }

  async componentDidMount(){
    var cookie = this.state.cookies.get('bmcookie');
    console.log(cookie)
    if(cookie){
    var rawResponse = await fetch('http://127.0.0.1:3001/verifyUser',{
        method: 'GET',
        headers:{
          bmcookie: this.state.cookies.get('bmcookie')
        }
      });
      var content = await rawResponse.json()
      if(content.playerid){
      this.setState({playerid:content.playerid});
    }
    }

    var arr = window.location.pathname.split('/');
    var sendJSON = {};
    sendJSON.id = arr[arr.length-1];
    this.setState({currentId:sendJSON.id});
    rawResponse = await fetch('http://127.0.0.1:3001/getUser',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendJSON)
      });
       content = await rawResponse.json()
      this.setState({username:content.username})
      this.setState({bio:content.bio})
  }
  render(){
  return(

    <div class='container'>
        <div class='header'>
        <a href="/">
        <img
          src={logo}
          id="logoLightplayer"
          alt="BeyondMafia"
        />
        </a>
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
        <div class='banner'></div>
        <div class='user-banner'>
            <p class='user-name'>{this.state.username}</p>
            <div class='user-banner-bot'>
            </div>
        </div>
        <div class='msg-bar'>
          <img src={msg} id='msg' alt="msg"/>
          <p>Message</p>
        </div>

        <div class='bar-left'>Shoutbox</div>
        <div class='bar-right'>Collections</div>
        <div class='bio-box'>{this.state.bio === null
                              ? "N/A"
                              : this.state.bio}</div>
        <div class='shout-chat'>Coming soon...</div>
        <div class='collect-content'>Coming soon...</div>
        <div class='bar-left'>friends</div>
        <div class='bar-right'>Favs</div>
        <div class='friends-content'>Coming soon...</div>
        <div class='favs-content'>Coming soon...</div>
        <div class='stat-bar'> {this.state.username}'s Stats </div>
        <div class='stat-content'> USER STATS</div>
        <img src={playerpic} id='profile' alt='banner profile'/>




    </div>
  );
  }
}

export default PlayerPage;
