import React, {Component} from 'react';
import { withRouter } from "react-router";
import '../css/PlayerPage.css'
import Cookies from 'universal-cookie';
import * as utils from './utils/image-resolver.js';
import YouTubePlayer from 'youtube-player';
import Modal from "react-responsive-modal";
class PlayerPage extends Component {
  constructor(props){
    var cookies = new Cookies();
    super(props);
      this.state = {
        cookies: cookies,
        playerid : -1,
        youtubeString: "https://www.youtube.com/watch?v=Iaoeedmw-H8",
        youtubeUrl:"",
      }
      this.playYoutube = this.playYoutube.bind(this);
      this.loadScript = this.loadScript.bind(this)
        this.loadChart = this.loadChart.bind(this)
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  loadChart(){
    if(window.google){
    window.google.charts.load('current', {'packages':['corechart']});
       window.google.charts.setOnLoadCallback(()=>{
         var data = window.google.visualization.arrayToDataTable([
           ['Stats', 'Score'],
           ['Wins',     this.state.wins],
           ['Losses',      this.state.losses],
           ['Desertions',  this.state.desertions]
         ]);
         var options = {
             colors: ['#34eb34','#ff2a00','#b8b6b6']
         };

         var chart = new window.google.visualization.PieChart(window.document.getElementById('playerchart'));

         chart.draw(data, options);
       })
     }
  }
  playYoutube(){
    var player = YouTubePlayer('youtube',{
      videoId: utils.parseYoutubeString(this.state.youtubeString)
    });
    player.playVideo().then(()=>{
      return;
    });
  }
  loadScript(src){
    var tag = document.createElement('script');
    tag.type = "text/javascript";
    tag.async = true;
    tag.src = src;
    tag.id = "googleChart"
    window.document.head.appendChild(tag);
}
  async componentDidMount(){
    var cookie = this.state.cookies.get('bmcookie');
    var arr = window.location.pathname.split('/');
    var sendJSON = {};
    sendJSON.id = arr[arr.length-1];
    this.setState({currentId:sendJSON.id});
    rawResponse = await fetch('https://www.beyondmafia.live/getUser',{
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
      this.setState({losses:content.losses});
      this.setState({wins:content.wins});
      this.setState({desertions:content.desertions});
      this.setState({points:content.points});
      this.setState({gems:content.gems});
      if(content.youtube != null){
        var player = YouTubePlayer('youtube',{
          videoId: content.youtube
        });
        await player.playVideo()
      }
    if(cookie){
    var rawResponse = await fetch('https://www.beyondmafia.live/verifyUser',{
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
  }
  render(){
  return(
    <div>
    <div class='header'>
    <a href="/">
    <img
      src="/assets/logo-light.png"
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
    <img src="/assets/default-avis/neurondark.png" id="player-pfp" alt="BeyondMafia"/>
    </div>
    <div class='container'>
    <Modal open={this.state.open} onClose={this.onCloseModal} center >
    <div className="formBox">
          <form >
            <input type="link" placeholder="Enter Youtube URL" onChange={e=> this.setState({youtubeUrl:e.target.value})}  />
            <input type="button" onClick={async ()=>{
              if(this.state.youtubeUrl.length > 5){
              var yt = new Promise((res,rej)=>{
              this.setState({youtubeString: this.state.youtubeUrl});
              this.setState({youtubeUrl:""})
              res();
            });
            yt.then(()=>{
              this.playYoutube();
            });
            }
          }}value="SUBMIT" />
            </form>
            </div>
    </Modal>
        <div class='banner'>
        <img src="/assets/default-avis/neurondark.png" id='profile' alt='banner profile'/>
</div>
        <div class='user-banner'>
            <p class='user-name'>{this.state.username}</p>
            <div class='user-banner-bot'>
            </div>
            <div class="leftStats">
            <img src="/assets/points.png"
            width="50px"
            height="50px"
            alt="Points"
            title="Points"
            />
            <div class="stats"> {this.state.points}
            </div>
            <img src="/assets/gem.png"
            width="50px"
            height="50px"
            alt="Gems"
            title="Gems"
            style={{marginTop:"-7px",paddingLeft:"5px"}}
            />   <div class="stats"> {this.state.gems}
              </div>
            </div>
        </div>
        <div class='msg-bar'>
          <img src="/assets/msg.png" id='msg' alt="msg"/>
          <p>Message</p>
          <img onClick={()=>{
            this.setState({open:true});
          }}src="/assets/settings.png" id='settings' alt="settings"/>
        </div>

        <div class="secondLayer">
        <div class="left-profile">
        <div class='bar-left'>Shoutbox</div>
        <div class='shout-chat'>{this.state.username} has no comments in their shoutbox!</div>
        <div class='bar-left'>Friends</div>
        <div class='friends-content'>{this.state.username} has no friends!</div>
        </div>
        <div  class='bio-box'>
        <div className="youtubeHolder"><div id="youtube" /></div>
        <div class="bio-text">{this.state.bio === null
                              ? "N/A"
                              : this.state.bio}
                              </div>
                            </div>
        <div class="right-profile">
        <div class='bar-right'>Collections</div>
        <div class='collect-content'>{this.state.username} has no items in their collection!</div>
        <div class='bar-right'>Favorites</div>
        <div class='favs-content'>{this.state.username} has no favorites!</div>
        </div>
        </div>
        <div class='stat-bar'> {this.state.username}'s Stats </div>
        <div class='stat-content'><div id="playerchart"/>{window.document.getElementById("googleChart") === null
            ?    this.loadScript('/scripts/loader.js')
          :!(this.state.displayWins === 0 && this.state.displayLosses === 0 && this.state.displayDesertions === 0)
            ? this.loadChart()
            : null}</div>
    </div>
    </div>
  );
  }
}

export default PlayerPage;
