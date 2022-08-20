import React, {Component} from 'react';
import './css/PlayerContainer.css'
import defaultRole from './assets/roles/default-role.png';

class PlayerContainer extends Component {
  constructor(props){
      super(props);
	  this.state = {
        roleImages:[],
	      selectedPlayer: 0
	  }
    this.importAll = this.importAll.bind(this);
  }

  importAll(r) {
      let images = {};
      r.keys().map(item => { images[item.replace('./', '')] = r(item); });
      return images;
  }

  componentDidMount(){
  this.setState({roleImages:this.importAll(require.context('./assets/roles', true, /.*/))})
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
           if(this.props.roleID === 0){
             roleImage = this.state.roleImages['roleimg_EM-00-00-villager.png'].default;
           }
           if(this.props.roleID === 1){
             roleImage = this.state.roleImages['roleimg_EM-01-00-vanilla.png'].default;
           }
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
  <img className="playerImage" src={"/static/media/kfy8nir1jq131.5c2dc0c7.jpg"} />
  <div className="playerName"> {player.name} </div>
    </div>
    )}
  )
  let graveyardElement;
  if(graveyard.length !== 0){
      let graveyardArr = [];

      /* In production we will use roleid + playerid to resolve the player image and the accurate role image. */
    graveyard.map(player => graveyardArr.push(
        <div className="player">
	    <img src={defaultRole} className="defaultRole"/>
	    <img className="playerImage" src={"/static/media/kfy8nir1jq131.5c2dc0c7.jpg"} />
	<div className="playerName"> {player.name} </div> </div>
      )
    )
    graveyardElement = <div className="graveyard"><h1>Graveyard</h1>{graveyardArr}</div>
  }

  return(
    <div className="playerContainer" style={{paddingLeft:'20px'}}>
    <h1>Village</h1>
      {playerArr}
      {graveyardElement}
    </div>

);
}
}

export default PlayerContainer;
