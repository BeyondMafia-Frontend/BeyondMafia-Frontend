import React, {Component} from 'react';
import PlayerContainer from './PlayerContainer.js'
class GamePage extends Component {
  constructor(props){
      super(props);
	  this.state = {
      players : [{name:"test", id:0 }],
      graveyard :[{name:"test", playerid:0, roleid: 0}],
      }

}
render(){
  return(
<div className="players" style={{float:"left"}}>
<PlayerContainer players={this.state.players} graveyard={this.state.graveyard}/>
</div>
);
}
}

export default GamePage;
