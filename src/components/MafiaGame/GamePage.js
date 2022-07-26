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
        playerVotes:{},
        value: "",
        port: 0,
	      players : [],
        maxSize: 0,
        playerid: 0,
        getSize: ()=>{
          return this.state.players.length;
        },
        addPlayer: (play)=>{
          var check = false;
          this.state.players.forEach( (player) => {
            if(player.playerid === play.playerid){
              check = true;
            }
          });
            if(!check){
              this.setState({players: [...this.state.players, play]})
        }
        },
	      graveyard :[{name:"test", playerid:0, roleid: 0}]
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateMessages = this.updateMessages.bind(this);
      this.setSocket =  this.setSocket.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.setGameSettings = this.setGameSettings.bind(this);
      this.addPlayer = this.addPlayer.bind(this);
      this.setPlayerId = this.setPlayerId.bind(this);
      this.sendVote = this.sendVote.bind(this);
      this.addVote = this.addVote.bind(this);
}

addVote(vote){
  this.setState(prevState => ({
    playerVotes: {                   // object that we want to update
        ...prevState.playerVotes,    // keep all other key-value pairs
        [vote.playerid]: vote.target       // update the value of specific key
    }
}))
}

handleChange(event){
  this.setState({value: event.target.value})
}

handleSubmit(event){
      event.preventDefault();
      this.setState({messages:[]})
      this.setState({port: this.state.value});
      this.setState({start:true});
}

setGameSettings(command){
  var players = []
  command.players.forEach((playerid)=>{
    players.push({name: playerid, playerid: playerid})
  })
  this.setState({players:players});
  this.setState({maxSize:command.maxSize});
  this.setState({gameState:command.state})
}

addPlayer(playerid){
    this.state.addPlayers({name: playerid, playerid: playerid})
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
sendVote(playerid){
  var cmd = {cmd:1, roleAction: 0, playerid: playerid};
  if(playerid === -2){
    cmd.playerid = -2;
  }
  else if(this.state.playerVotes[this.state.playerid] === playerid){
    cmd.playerid = -1;
  }
  this.state.ws.send(JSON.stringify(cmd));
}

setPlayerId(playerid){
  if(this.state.playerid === 0){
  this.setState({playerid:playerid});
}
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
	    <GameBanner maxPlayers={this.state.maxSize} players={this.state.players.length} />
	    </div>

	    <div className="gameContainer" style={{display:"flex", paddingTop:"50px"}}>

		<div className="players" style={{paddingRight: "30px"}}>
		    <PlayerContainer players={this.state.players} graveyard={this.state.graveyard} />
		</div>


		<div className="chat" style={{margin:'0 auto', overflowX: "hidden"}}>
		    <ChatContainer addVote={this.addVote} setPlayerId={this.setPlayerId} addPlayer={this.state.addPlayer} setGameSettings={this.setGameSettings}  sendMessage={this.sendMessage} messages={this.state.messages}/>
		</div>

		<div className="meeting">
		    <ChatMeeting  votes={this.state.playerVotes} sendVote={this.sendVote} members={this.state.players}/>
		</div>



	</div>
	    </div>


  );
}
}

export default GamePage;
