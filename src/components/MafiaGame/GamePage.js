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
        meetings: [],
        messages: [],
        messageBankLength: -1,
        meetingBank:{},
        roles:[],
        selectedGameState:-1,
        gameState: 0,
        roleID:-1,
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
	      graveyard :[]
      }
      this.setMembers = this.setMembers.bind(this);
      this.setMessageBankLength = this.setMessageBankLength.bind(this);
      this.setSelectedGameState = this.setSelectedGameState.bind(this);
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
      this.addGraveyard = this.addGraveyard.bind(this);
      this.updateGameState = this.updateGameState.bind(this)
      this.setRoleID =  this.setRoleID.bind(this);
      this.removePlayer = this.removePlayer.bind(this)
}

setMembers(meeting){
    this.setState({ meetings: [...this.state.meetings, meeting] });
}
setMessageBankLength(length){
  this.setState({messageBankLength:length})
}
setSelectedGameState(gameState){
  this.setState({selectedGameState:gameState});
}

setRoleID(id){
  this.setState({roleID:id});
}

addVote(vote){
  this.setState(prevState => ({
    playerVotes: {                   // object that we want to update
        ...prevState.playerVotes,    // keep all other key-value pairs
        [vote.playerid]: vote.target       // update the value of specific key
    }
}))
}

removePlayer(playerid){
  this.setState({
    players: this.state.players.filter((player)=> player.playerid !== playerid)
  });
}

updateGameState(gameState){
  var meetingContext = {
    meetings: this.state.meetings,
    playerVotes: this.state.playerVotes
  }
  this.setState(prevState => ({
    meetingBank: {                   // object that we want to update
        ...prevState.meetingBank,    // keep all other key-value pairs
      [gameState]: meetingContext      // update the value of specific key
    }
  })
)
  this.setState({meetings:[]});
  this.setState({playerVotes:{}});
  this.setState({selectedGameState:-1});
  this.setState({gameState:gameState});
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
  var graveyard = []
  command.players.forEach((playerid)=>{
    players.push({name: playerid, playerid: playerid})
  })
  command.graveyard.forEach((playerid)=>{
    graveyard.push({name:playerid, playerid: playerid})
  })
  this.setState({roles:command.roles});
  this.setState({players:players});
  this.setState({graveyard:graveyard})
  this.setState({state:command.state})
  this.setState({maxSize:command.maxSize});
  this.setState({gameState:command.state})
}
addGraveyard(player){
  var check = false;
  this.state.graveyard.forEach( (play) => {
    if(player.playerid === play.playerid){
      check = true;
    }
  });
  if(check === false){
  this.setState({graveyard: [...this.state.graveyard, player]})
}
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
sendVote(playerid,roleID){
  var cmd = {cmd:1, roleAction: roleID, playerid: playerid};
  if(this.state.playerVotes[this.state.playerid] === playerid || this.state.playerVotes[this.state.playerid] === 18446744073709551615){
    cmd.playerid = 0;
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
  var meetings = []
  if(this.state.meetings.length !== 0){
  if(this.state.selectedGameState === -1 || this.state.messageBankLength+1 === this.state.selectedGameState){
      this.state.meetings.forEach((stateMeetings) => {
        meetings.push(<ChatMeeting prev={false}votes={this.state.playerVotes} sendVote={this.sendVote} members={stateMeetings.members} role={stateMeetings.role} players={this.state.players}/>)
      });
  }
  else{
     var meetingContext = this.state.meetingBank[this.state.selectedGameState+1]
         meetingContext.meetings.forEach((meeting, i) => {
           meetings.push(<ChatMeeting prev={true} votes={meetingContext.playerVotes} sendVote={this.sendVote} members={meeting.members} role={meeting.role} players={this.state.players}/>)
         });
  }
}
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
	    <GameBanner selectedGameState={this.state.selectedGameState} messageBankLength={this.state.messageBankLength} setSelectedGameState={this.setSelectedGameState} roles={this.state.roles} gameState={this.state.gameState} maxPlayers={this.state.maxSize} players={this.state.players.length} />
	    </div>

	    <div className="gameContainer" style={{display:"flex", paddingTop:"50px"}}>

		<div className="players" style={{paddingRight: "30px"}}>
		    <PlayerContainer playerid={this.state.playerid} roleID={this.state.roleID} players={this.state.players} graveyard={this.state.graveyard} />
		</div>


		<div className="chat" style={{margin:'0 auto', overflowX: "hidden"}}>
		    <ChatContainer setMembers={this.setMembers} setMessageBankLength={this.setMessageBankLength} selectedGameState={this.state.selectedGameState} setRoleID={this.setRoleID} removePlayer={this.removePlayer}  updateGameState={this.updateGameState} addGraveyard={this.addGraveyard} addVote={this.addVote} setPlayerId={this.setPlayerId} addPlayer={this.state.addPlayer} setGameSettings={this.setGameSettings}  sendMessage={this.sendMessage} messages={this.state.messages}/>
		</div>

		<div className="meeting">
        {meetings}
		</div>



	</div>
	    </div>


  );
}
}

export default GamePage;
