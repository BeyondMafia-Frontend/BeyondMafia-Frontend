import React, {Component} from 'react';
import PlayerContainer from './PlayerContainer.js'
import ChatContainer from './ChatContainer.js'
import GameBanner from './GameHeader.js'
import ChatMeeting from './ChatMeeting.js'
import MafiaConnection from './MafiaConnection.js'
import  './css/GameHeader.css'
class GamePage extends Component {
  constructor(props){
      super(props);
	  this.state = {
        messages: [],
        value: "",
        port: 0,
	      players : [{name:"test", id:0 },{name:"test2", id:0},{name:"test3", id:0},{name:"test4", id:0},{name:"test5", id:0},{name:"test6", id:0},{name:"test7", id:0},{name:"test8", id:0}],
	      graveyard :[{name:"test", playerid:0, roleid: 0}]
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateMessages = this.updateMessages.bind(this);
      this.setSocket =  this.setSocket.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
}

handleChange(event){
  this.setState({value: event.target.value})
}
handleSubmit(event){
      this.setState({messages:[]})
      this.setState({port: this.state.value});
      this.setState({start:true});
      event.preventDefault();
}

updateMessages(message){
  this.setState({ messages: [...this.state.messages, message] });
}
setSocket(socket){
  this.setState({ws:socket});
}
sendMessage(message){
  this.state.ws.send(message);
}

render(){
  let connection,connected;
  let wsConnection;
  if(this.state.start){
    this.setState({start:false});
    connection = <MafiaConnection setSocket={this.setSocket} updateMessages={this.updateMessages} websocketPort={this.state.port}/>
  }
    return(
	<div>
      <div className="websocket">
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </form>
      {connection}

      </div>
	    <div className="gameHeader">
	    <GameBanner />
	    </div>

	    <div className="gameContainer" style={{display:"flex", paddingTop:"50px"}}>

		<div className="players" style={{paddingRight: "30px"}}>
		    <PlayerContainer players={this.state.players} graveyard={this.state.graveyard} />
		</div>


		<div className="chat" style={{margin:'0 auto', overflowX: "hidden"}}>
		    <ChatContainer sendMessage={this.sendMessage} messages={this.state.messages}/>
		</div>

		<div className="meeting">
		    <ChatMeeting members={this.state.players}/>
		</div>



	</div>
	    </div>


  );
}
}

export default GamePage;
