import React, {Component} from 'react';
import PlayerContainer from './PlayerContainer.js'
import ChatContainer from './ChatContainer.js'
class GamePage extends Component {
  constructor(props){
      super(props);
	  this.state = {
      players : [{name:"test", id:0 }],
      graveyard :[{name:"test", playerid:0, roleid: 0}],
      messages: [{msgType: 0, name: 'test', msg:'hello'}],
      }

}
render(){
  return(
<div className="gameContainer" style={{display:'flex'}}>
<div className="players" style={{paddingRight: '30px'}}>
<PlayerContainer players={this.state.players} graveyard={this.state.graveyard}/>
</div>

<div className="chat" style={{height:'100%'},{margin:'0 auto'}}>
<ChatContainer messages={this.state.messages}/>
</div>
</div>
);
}
}

export default GamePage;
