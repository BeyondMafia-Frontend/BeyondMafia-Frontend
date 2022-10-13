import React, {Component} from 'react';
import PlayerContainer from './PlayerContainer.js'
import ChatContainer from './ChatContainer.js'
import GameBanner from './GameHeader.js'
import ChatMeeting from './ChatMeeting.js'
import Cookies from 'universal-cookie';
import MafiaConnection from './MafiaConnection.js'
import  './css/GameHeader.css'
class GamePage extends Component {
  constructor(props){
      super(props);
      var cookies = new Cookies();
      var day = new Audio("/assets/day.wav");
      var night = new Audio("/assets/night.wav");
	  this.state = {
        cookies: cookies,
        meetings: [],
        messages: [],
        typingMap:{},
        playerMap:[],
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
        day: day,
        night: night,
        kickedCount: -1,
        getSize: ()=>{
          return this.state.players.length;
        },
	      graveyard :[]
      }
      this.setMembers = this.setMembers.bind(this);
      this.setMessageBankLength = this.setMessageBankLength.bind(this);
      this.setSelectedGameState = this.setSelectedGameState.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
      this.removePlayer = this.removePlayer.bind(this);
      this.getPlayerName = this.getPlayerName.bind(this);
      this.containsUser = this.containsUser.bind(this);
      this.setTyping = this.setTyping.bind(this);
      this.displayKicks = this.displayKicks.bind(this)
      this.sendKicks = this.sendKicks.bind(this);
}

sendKicks(){
    this.state.ws.send(JSON.stringify({cmd:3}))
}

displayKicks(count){
  this.setState({kickedCount:count});
}

setTyping(playerid,bool){
  if(bool === true){
    window.document.getElementById(playerid.toString()).lastChild.style.display = "inherit";
  }
  else{
      window.document.getElementById(playerid.toString()).lastChild.style.display = "none";
  }
}

containsUser(playerid){
  for(var i = 0; i < this.state.playerMap.length;i++){
    if(this.state.playerMap[i].playerid === playerid){
      return true;
    }
  }
  return false;
}
async componentDidMount(){
  var cookie = this.state.cookies.get('bmcookie');
  const rawResponse = await fetch('https://www.beyondmafia.live/getSocket',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'bmcookie' : cookie
      },
    });
    const content = await rawResponse.json()
    if(content.cmd === 1){
    this.setState({messages:[]})
    this.setState({port:content.port});
    this.setState({start:true});
  }
  else{
    window.location.href = '/lobby'
  }
}

getPlayerName(playerid){
  for(var i = 0 ; i < this.state.playerMap.length;i++){
    if(this.state.playerMap[i].playerid === playerid){
      return this.state.playerMap[i].name;
      break;
    }
  }
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
  if(this.state.playerVotes[vote.playerid.toString()] === undefined){
  this.setState(prevState => ({
    playerVotes: {                   // object that we want to update
        ...prevState.playerVotes,    // keep all other key-value pairs
        [vote.playerid]: [{target:vote.target, roleAction: vote.roleAction}]       // update the value of specific key
    }
}))
}
else{
  var votesArr = this.state.playerVotes[vote.playerid.toString()].filter(votes => votes.roleAction !== vote.roleAction);
  votesArr.push({target:vote.target, roleAction: vote.roleAction})
  this.setState(prevState => ({
    playerVotes: {                   // object that we want to update
        ...prevState.playerVotes,    // keep all other key-value pairs
        [vote.playerid]: votesArr       // update the value of specific key
    }
}))
}
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
if(gameState > this.state.state){
  if(gameState % 2){
    this.state.day.play();
  }
  else{
    this.state.night.play();
  }
}
  this.setState({meetings:[]});
  this.setState({playerVotes:{}});
  this.setState({selectedGameState:-1});
  this.setState({gameState:gameState});
}
handleChange(event){
  this.setState({value: event.target.value})
}

 async setGameSettings(command){
  var playerMap = []
  var players = []
  var graveyard = []
  var globalPlayersPromise = command.globalPlayers.map(async(playerid)=>{
    var sendJSON = {};
    sendJSON.id = playerid
    var rawResponse = await fetch('https://www.beyondmafia.live/getUser',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendJSON)
      });
       var content = await rawResponse.json();
       playerMap.push({name:content.username, playerid:playerid,wins:content.wins,losses:content.losses,desertions:content.desertions,points:content.points,gems:content.gems});
  })
  await Promise.all(globalPlayersPromise);
  this.setState({playerMap:playerMap});
  var playersPromise = playerMap.map(async(player) => {
    if(command.players.includes(player.playerid)){
      players.push(player);
    }
    if(command.graveyard.includes(player.playerid)){
      graveyard.push(player)
    }
  });
  await Promise.all(playersPromise);
  this.setState({players:players});
  this.setState({graveyard:graveyard})
  this.setState({roles:command.roles});
  this.setState({state:command.state})
  this.setState({maxSize:command.maxSize});
  this.setState({gameState:command.state})
}
addGraveyard(player){
  var check = false;
  var grave = this.state.graveyard.filter(p =>
    p.playerid !== player.playerid);
    grave.push({name:player.name,playerid:player.playerid,role:player.roleid})
  this.setState({graveyard:grave})
}
async addPlayer(playerid){
  var sendJSON = {};
  sendJSON.id = playerid
  var rawResponse = await fetch('https://www.beyondmafia.live/getUser',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendJSON)
    });
  var content = await rawResponse.json();
  this.setState({ players: [...this.state.players, {name:content.username,playerid:playerid}]});
  this.setState({ playerMap:[...this.state.playerMap, {name:content.username,playerid:playerid}]});
}


updateMessages(message){
  if(message.length > 0){
  this.setState({ messages: [...this.state.messages, message] });
}
}

setSocket(socket){
  this.setState({ws:socket});
}
sendMessage(message){
  this.state.ws.send(message);
}
sendVote(playerid,roleID){
  var cmd = {cmd:1, roleAction: roleID, playerid: playerid};
  if(this.state.playerVotes[this.state.playerid.toString()] !== undefined){
    this.state.playerVotes[this.state.playerid.toString()].forEach((item) => {
        if(roleID === item.roleAction && (item.target === playerid || item.target === 18446744073709551615)){
          cmd.playerid = 0;
        }
    });
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
  if(this.state.selectedGameState === -1 || this.state.messageBankLength+1 === this.state.selectedGameState || this.state.selectedGameState === this.state.gameState){
      this.state.meetings.forEach((stateMeetings) => {

        meetings.push(<ChatMeeting getPlayerName={this.getPlayerName} displayCount={this.state.meetings.length} prev={false}votes={this.state.playerVotes} sendVote={this.sendVote} members={stateMeetings.members} role={stateMeetings.role} players={this.state.players}/>)
      });
  }
  else{
     var meetingContext = this.state.meetingBank[this.state.selectedGameState+1]
         meetingContext.meetings.forEach((meeting, i) => {
           meetings.push(<ChatMeeting getPlayerName={this.getPlayerName} prev={true} votes={meetingContext.playerVotes} sendVote={this.sendVote} members={meeting.members} role={meeting.role} players={this.state.players}/>)
         });
  }
}
  if(this.state.start){
    connection = <MafiaConnection bmcookie={this.state.cookies.get('bmcookie')} setSocket={this.setSocket} updateMessages={this.updateMessages} websocketPort={this.state.port}/>
  }

    return(
	<div style={{"min-width":"fit-content"}}>
      <div className="websocket">
      {connection}

      </div>

      <div onClick={()=>{
        this.state.ws.send(JSON.stringify({cmd:2}));
      }}>
      Leave Game
      </div>
	    <div className="gameHeader">
	    <GameBanner sendKicks={this.sendKicks} kickedCount={this.state.kickedCount} selectedGameState={this.state.selectedGameState} messageBankLength={this.state.messageBankLength} setSelectedGameState={this.setSelectedGameState} roles={this.state.roles} gameState={this.state.gameState} maxPlayers={this.state.maxSize} players={this.state.players.length} />
	    </div>

	    <div className="gameContainer" style={{display:"flex", paddingTop:"50px"}}>

		<div className="players" style={{paddingRight: "30px",width:"25%","min-width":"fit-content"}}>
		    <PlayerContainer playerid={this.state.playerid} roleID={this.state.roleID} players={this.state.players} graveyard={this.state.graveyard} />
		</div>


		<div className="chat" style={{overflowX: "hidden",width:"75%","min-width":"fit-content"}}>
		    <ChatContainer displayKicks={this.displayKicks} setTyping={this.setTyping} getPlayerName={this.getPlayerName} setMembers={this.setMembers} setMessageBankLength={this.setMessageBankLength} selectedGameState={this.state.selectedGameState} setRoleID={this.setRoleID} removePlayer={this.removePlayer}  updateGameState={this.updateGameState} addGraveyard={this.addGraveyard} addVote={this.addVote} setPlayerId={this.setPlayerId} addPlayer={this.addPlayer} setGameSettings={this.setGameSettings}  sendMessage={this.sendMessage} messages={this.state.messages}/>
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
