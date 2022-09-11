import React, {Component} from 'react';
import './css/PlayerContainer.css'
import * as utils from '../utils/image-resolver.js';

var defaultRole = '/assets/roles/default-role.png';
class PlayerContainer extends Component {
  constructor(props){
      super(props);
	  this.state = {
        roleImages:[],
	      selectedPlayer: 0
	  }
  }


  componentDidMount(){
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
    <div className="player" onClick={this.handlePlayerClick(player.id)}>
  <img src={roleImage} className="role"/>
  <img className="playerImage" src={"/assets/default-avis/kfy8nir1jq131.5c2dc0c7.jpg"} />
  <div className="playerName"> {player.name} </div>
    </div>
    )}
  )
  let graveyardElement;
  if(graveyard.length !== 0){
      let graveyardArr = [];

      /* In production we will use roleid + playerid to resolve the player image and the accurate role image. */
    graveyard.map(player => {
      graveyardArr.push(
        <div className="player">
	    <img src={utils.resolveRole(player.role)} className="role"/>
	    <img className="playerImage" src={"/assets/default-avis/kfy8nir1jq131.5c2dc0c7.jpg"} />
	<div className="playerName"> {player.name} </div> </div>
      )
    }
    )
    graveyardElement = <div className="graveyard"><h1>Graveyard</h1>{graveyardArr}</div>
  }

  return(
    <div className="playerContainer" style={{paddingLeft:'20px'}}>
    <h1>
    <img src="/assets/village.png" width="50px" height="50px" style="
    padding-right: 10px;
    ">
    Village</h1>
      {playerArr}
      {graveyardElement}
    </div>

);
}
}

export default PlayerContainer;
