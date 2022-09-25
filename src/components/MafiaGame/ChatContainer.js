import React, {Component} from 'react';
import './css/ChatContainer.css'
import * as utils from '../utils/image-resolver.js';
class ChatContainer extends Component {
  constructor(props){
      super(props);
	  this.state = {
      reading: false,
      messages:[],
      messagesQueue:[],
      messageBank:{},
      messageCount:-1,
      scrollBottom:undefined,
      typing: undefined,
      parsed:false,
      typingDisabled: false,
      msgText: '',
      completed: false,
      }
      this.handleType = this.handleType.bind(this);
      this.handleSendMessage = this.handleSendMessage.bind(this);
      this.parseTypingMessage = this.parseTypingMessage.bind(this);
      this.iterateMessages = this.iterateMessages.bind(this);
      this.parseNotTypingMessage = this.parseNotTypingMessage.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.parseSettingsMessage = this.parseSettingsMessage.bind(this);
      this.parseVoteMessage =  this.parseVoteMessage.bind(this);
      this.parseRoleMessage = this.parseRoleMessage.bind(this);
      this.getRoleDetails = this.getRoleDetails.bind(this);
      this.parseLeaveMessage = this.parseLeaveMessage.bind(this);
}
iterateMessages(gameState){
  this.setState(prevState => ({
    messageBank: {                   // object that we want to update
        ...prevState.messageBank,    // keep all other key-value pairs
      [gameState]: this.state.messages      // update the value of specific key
    }
  })
)
}

getRoleDetails(roleID){
  let role = utils.resolveRoleString(roleID);
  return(<div className="systemMessage"><body>You have been assigned the {role}!</body></div>)
}
handleScroll(){
  var chat = document.getElementsByClassName('chatContainer')[0];
  if(chat + window.innerHeight >= chat.scrollHeight){
  this.setState({scrollBottom:true});
  }
  else{
    this.setState({scrollBottom:false});
  }
}
handlePlayerClick = playerName => () => {
  var appendedMessage = '@' + playerName + ' ';
  if(this.state.msgText.length === 0){
    this.setState({msgText:appendedMessage});
  }
  else{
    if(!this.state.msgText.includes(appendedMessage)){
    appendedMessage = appendedMessage + this.state.msgText + '';
    this.setState({msgText:appendedMessage})
  }
  }
  window.msgText = this.state.msgText;
}

async parseSettingsMessage(command){
  return new Promise(async(resolve)=>{
  if(this.state.parsed === false){
  this.setState({parsed:true});
  this.setState({currentGameState:command.state})
  await this.props.setGameSettings(command);
  this.setState({completed:true});
  resolve();
  }
});
}

parseVoteMessage(command){
  this.props.addVote({playerid:command.playerid, target:command.target, roleAction:command.roleAction});
  if(command.playerid !== command.target){
    if(command.target ===  -1){
      return(<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} unvotes!</body></div>)
    }
    else if(command.target === 18446744073709551615){
      return(<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} votes no one!</body></div>)
    }
    else{
  return(<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} votes {this.props.getPlayerName(command.target)}!</body></div>)
}
}
else{
return(<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} votes themself!</body></div>)
}

}
parsePlayerMessage(command){
 return (<div className="playerChat"><img className="chatImage" src={"/assets/default-avis/neurondark.png"} /> <body> <strong onClick={this.handlePlayerClick(command.playerId)}>{this.props.getPlayerName(command.playerId)}</strong> | {command.msg} </body> </div>);
}

parseSystemMessage(command){
  return(<div className="systemMessage"><body>{command.msg}</body></div>)
}

parseTypingMessage(command){
    this.props.setTyping(command.playerId,true);
}
parseRoleMessage(command){
    var playerid = command.playerid;
  if(command.action === 1){
    this.props.removePlayer(playerid);
    this.props.addGraveyard({name: playerid, playerid: playerid,roleid:command.role});
    this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>{this.props.getPlayerName(playerid)} has been sent to the guillotine. </body></div>)]})
    return;
  }
  if(command.action === 2){
    if(command.alignment === 1){
      this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>After investigations, you suspect that {this.props.getPlayerName(playerid)} is sided with the mafia.</body></div>)]})
      return;
    }
    else{
      this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>After investigations, you suspect that {this.props.getPlayerName(playerid)} is sided with the village.</body></div>)]})
      return;
    }
  }
  if(command.action === 3){
    this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>A bullet hits your vest! You cannot survive another hit!</body></div>)]})
  }
  if(command.action === 4){
    this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>You learned that {this.props.getPlayerName(playerid)} is {utils.resolveRoleString(command.role)}! </body></div>)]})
  }
}

parseNotTypingMessage(command){
    //hidebubble
    this.props.setTyping(command.playerId,false);
}

parseLeaveMessage(command){
    return(<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} has left the game!</body></div>)
}

handleType(event) {
   this.setState({msgText: event.target.value});
   var command = {};
   if(event.target.value.length === 1){
   command.cmd = -1;
   this.props.sendMessage(JSON.stringify(command));
   }
   if(!event.target.value){
     command.cmd = -2;
     this.props.sendMessage(JSON.stringify(command));
   }
 }


 handleSendMessage(event) {
   event.preventDefault();
   var command = {};
   if(this.state.msgText.length !== 0){
    command.cmd = -2;
    this.props.sendMessage(JSON.stringify(command));
    command.cmd = 0;
    command.msg = this.state.msgText;
    this.props.sendMessage(JSON.stringify(command));
    this.setState({msgText:''});
  }
    }



render(){
  var {messages} = this.props;
  var messagesArr = [];
  var gameInit = new Promise(async (res,reject)=>{
  if(!this.state.completed){
  for(var i = 0; i < messages.length;i++){
    var command = JSON.parse(messages[i]);
    var messageElement;
    if(command.cmd === -4){
      alert('game over');
    }

    if(command.cmd === -3){
      this.props.setPlayerId(command.playerId)
    }
    if(command.cmd === 0){
      this.setState({messages: [...this.state.messages, this.parsePlayerMessage(command)]})
    }
    if(command.cmd === 1){
        this.setState({messages: [...this.state.messages, this.parseSystemMessage(command)]})
    }
    if(command.cmd === 2){
      this.setState({messages: [...this.state.messages, this.parseVoteMessage(command)]})
    }
    if(command.cmd === 3){
      this.setState({messages: [...this.state.messages, this.parseRoleMessage(command)]})
    }
    if(command.cmd === 4){
      this.props.setRoleID(command.role);
        this.setState({messages: [...this.state.messages, this.getRoleDetails(command.role)]})
    }
    if(command.cmd === 5){
      var meeting = {
        members: command.players,
        role: command.role
      };
      this.props.setMembers(meeting);
    }
    if(command.cmd === 7){
      this.setState({currentGameState:command.state});
      this.props.updateGameState(command.state);
      this.iterateMessages(command.state);
      this.setState({messages:this.state.messagesQueue});
      this.setState({messagesQueue:[]})
      this.props.setMessageBankLength(Object.keys(this.state.messageBank).length);
    }
    if(command.cmd === 8){
      this.props.addPlayer(command.playerid)
    }
    if(command.cmd === 9){
      await this.parseSettingsMessage(command);
    }
    messages.splice(i,1);
  }
  res();
}
else{
  res();
}
});

var displayedMessages;
gameInit.then(()=>{
  messages.map((message) => {
    let messageElement;
    var command = JSON.parse(message);
    if(command.cmd === -4){
      alert('game over');
    }
    if(command.cmd === -2){
      this.parseNotTypingMessage(command)
    }
    if(command.cmd === -1){
      this.parseTypingMessage(command)
    }
    if(command.cmd === 0){
      this.setState({messages: [...this.state.messages, this.parsePlayerMessage(command)]})
    }
    if(command.cmd === 1){
        this.setState({messages: [...this.state.messages, this.parseSystemMessage(command)]})
    }
    if(command.cmd === 2){
      this.setState({messages: [...this.state.messages, this.parseVoteMessage(command)]})
    }
    if(command.cmd === 3){
      this.setState({messages: [...this.state.messages, this.parseRoleMessage(command)]})
    }
    if(command.cmd === 4){
      this.props.setRoleID(command.role);
        this.setState({messages: [...this.state.messages, this.getRoleDetails(command.role)]})
    }
    if(command.cmd === 5){
      var meeting = {
        members: command.players,
        role: command.role
      };
      this.props.setMembers(meeting);
    }
    if(command.cmd === 6){
      this.props.removePlayer(command.playerid);
      this.setState({messages: [...this.state.messages, this.getRoleDetails(command.role)]})
    }
    if(command.cmd === 7){
      this.setState({currentGameState:command.state});
      this.props.updateGameState(command.state);
      this.iterateMessages(command.state);
      this.setState({messages:this.state.messagesQueue});
      this.setState({messagesQueue:[]})
      this.props.setMessageBankLength(Object.keys(this.state.messageBank).length);
      messages.shift();
      return;
    }
    if(command.cmd === 8){
      this.props.addPlayer(command.playerid)
    }
    messages.shift();
  });
})
if(this.props.selectedGameState === -1 || Object.keys(this.state.messageBank).length <= this.props.selectedGameState){
  displayedMessages = this.state.messages;
}
else{
  displayedMessages = this.state.messageBank[this.props.selectedGameState+1];
}
  return(
  <div>
  <div className="chatContainer" onScroll={this.handleScroll}>
  {displayedMessages}
  </div>
  <div className="chatInput">
  <form onSubmit={this.handleSendMessage}>
  <input type="text" placeholder="Enter a message here..." value={this.state.msgText} onChange={this.handleType}/>
</form>
</div>
  </div>
);
}
}


export default ChatContainer;
