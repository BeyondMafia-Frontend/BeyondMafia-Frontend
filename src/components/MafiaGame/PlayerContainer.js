import React, {Component} from 'react';
import './css/PlayerContainer.css'
import defaultRole from './assets/default-role.png';
class PlayerContainer extends Component {
  constructor(props){
      super(props);
	  this.state = {
      selectedPlayer: -1
      }
}
handlePlayerClick = playerid => () => {
    this.setState({selectedPlayer:playerid});
}

render(){
  var {players, graveyard} = this.props;
  let playerArr = [];
  players.map(player => playerArr.push(
      <div className="player" onClick={this.handlePlayerClick(player.id)}><img src={defaultRole} className="role"/><img className="playerImage" src={"/static/media/kfy8nir1jq131.5c2dc0c7.jpg"} /> <p> {player.name} </p> </div>
    )
  )
  let graveyardElement;
  if(graveyard.length !== 0){
    let graveyardArr = [];
    graveyard.map(player => graveyardArr.push(
        <div className="player"><img src={defaultRole} className="defaultRole"/><img className="playerImage" src={"/static/media/kfy8nir1jq131.5c2dc0c7.jpg"} /> <p> {player.name} </p> </div>
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
