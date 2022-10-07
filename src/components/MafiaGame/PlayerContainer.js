import React, {Component} from 'react';
import './css/PlayerContainer.css'
import './css/typing.scss'
import * as utils from '../utils/image-resolver.js';
import ReactCardFlip from 'react-card-flip';

var defaultRole = '/assets/roles/default-role.png';
class PlayerContainer extends Component {
  constructor(props){
      super(props);
	  this.state = {
        roleImages:[],
	      selectedPlayer: 0,
        isFlipped:false
	  }
    this.displayPlayerStats =  this.displayPlayerStats.bind(this);
    this.flipCard = this.flipCard.bind(this);
  }
  async componentDidMount() {
    var loadScript = async function (src) {
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = src;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(tag);
    }

    await loadScript('/scripts/loader.js');
  }
flipCard(){
  this.setState({isFlipped:!this.state.isFlipped})
  if(!this.state.isFlipped){
    if(!(this.state.wins === 0 && this.state.losses === 0 && this.state.desertions === 0)){
    window.google.charts.load('current', {'packages':['corechart']});
     window.google.charts.setOnLoadCallback(()=>{
       var data = window.google.visualization.arrayToDataTable([
         ['Stats', 'Score'],
         ['Wins',     this.state.displayWins],
         ['Losses',      this.state.displayLosses],
         ['Desertions',  this.state.displayDesertions]
       ]);
       var nameString = this.state.displayName + `'s Stats`;
       var options = {
         title: nameString,
           backgroundColor: '#EBEBEA',
           colors: ['#34eb34','#ff2a00','#b8b6b6']
       };

       var chart = new window.google.visualization.PieChart(document.getElementById('chart'));

       chart.draw(data, options);
     });
   }
  }
}
displayPlayerStats(playerid,name,wins,losses,desertions,points,gems){
this.setState({displayInfo:true});
this.setState({displayName:name});
this.setState({displayWins:wins});
this.setState({displayLosses:losses});
this.setState({displayDesertions:desertions});
this.setState({displayPoints:points});
this.setState({displayGems:gems});
}

handlePlayerClick = playerid => () => {
    this.setState({selectedPlayer:playerid});
}

render(){
    var {players, graveyard} = this.props;
    var playerArr = [];
    var roleImage;
    players.map((player) => {
      if(this.props.playerid === player.playerid){
        if(this.props.roleID !== -1){
           roleImage = utils.resolveRole(this.props.roleID)
        }
        else{
          roleImage = defaultRole;
        }
    }
    else{
      roleImage = defaultRole;
    }
    playerArr.push(
    <div className="player" id={player.playerid} onClick={()=>{this.displayPlayerStats(player.playerid,player.name,player.wins,player.losses,player.desertions,player.points,player.gems)
      this.setState({isFlipped:false})}}>
  <img src={roleImage} className="role"/>
  <img className="playerImage" src={"/assets/default-avis/neurondark.png"} />
  <div className="playerName"> {player.name} </div>
  <div class="typing-indicator">
      <span></span>
      <span></span>
          <span></span>
      </div>
    </div>
    )}
  )
  let graveyardElement;
  if(graveyard.length !== 0){
      let graveyardArr = [];

      /* In production we will use roleid + playerid to resolve the player image and the accurate role image. */
    graveyard.map(player => {
      graveyardArr.push(
        <div className="player" id={player.playerid} onClick={()=>{
          this.displayPlayerStats(player.playerid,player.name,player.wins,player.losses,player.desertions,player.points,player.gems)
          this.setState({isFlipped:false})}}>
	    <img src={utils.resolveRole(player.role)} className="role"/>
	    <img className="playerImage" src={"/assets/default-avis/neurondark.png"} />
	<div className="playerName"> {player.name} </div>
  <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
      </div>
    </div>
      )
    }
    )
    graveyardElement = <div className="graveyard"><h1>Graveyard</h1>{graveyardArr}</div>
  }

  return(
    <div>
    {this.state.displayInfo
    ?
    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
    <div onClick={()=>{this.flipCard()}} className="infoContainer" style={{paddingLeft:'20px'}}>
    <a href="#" onClick={()=>{this.setState({displayInfo:false})}} class="close"/>
    <img src="/assets/default-avis/neurondark.png" className="profilePic">
    </img>
      <span style={{fontWeight:"bold"}}> {this.state.displayName} </span>
      <div class="infoStats">
      <img src="/assets/points.png"
      width="35px"
      height="35px"
      alt="Points"
      title="Points"
      />
      <div class="stats"> {this.state.displayPoints}
      </div>
      <img src="/assets/gem.png"
      width="35px"
      height="35px"
      alt="Gems"
      title="Gems"
      style={{marginTop:"-7px",paddingLeft:"5px"}}
      />   <div class="stats"> {this.state.displayGems}
        </div>
      </div>
  </div>

  <div onClick={()=>{this.flipCard()}} className="infoContainer" style={{paddingLeft:'20px', width:"350px"}}>
  <div  onClick={()=>{this.setState({displayInfo:false})}} class="close"/>
  {(this.state.displayWins === 0 && this.state.displayLosses === 0 && this.state.displayDesertions === 0)
    ? <span> {this.displayName} has no stats </span>
    : null
  }
  <div id="chart" style={{display:'flex',width:"100%"}}/>
</div>
  </ReactCardFlip>
    : null}
    <div  className="playerContainer" style={{paddingLeft:'20px'}}>
    <span></span>
    <h1>
    <img src="/assets/village.png" width="50px" height="50px" style={{paddingRight:"10px"}}/>
    Village</h1>
      {playerArr}
      {graveyardElement}
    </div>
    </div>

);
}
}

export default PlayerContainer;
