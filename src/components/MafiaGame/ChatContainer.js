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

parseSettingsMessage(command){
  if(this.state.parsed === false){
  this.setState({currentGameState:command.state})
  this.props.setGameSettings(command);
  this.setState({parsed:true});
}
}

parseVoteMessage(command){
  this.props.addVote({playerid:command.playerid, target:command.target, roleAction:command.roleAction});
  if(command.playerid !== command.target){
    if(command.target ===  -1){
      return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} unvotes!</body></div>)
    }
    else if(command.target === 18446744073709551615){
      return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} votes no one!</body></div>)
    }
    else{
  return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} votes {async()=>{return await this.props.getPlayerName(command.target)}}!</body></div>)
}
}
else{
return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} votes themself!</body></div>)
}

}
parsePlayerMessage(command){
 return (<div className="playerChat"><img className="chatImage" src={"/assets/default-avis/neurondark.png"} /> <body> <strong onClick={this.handlePlayerClick(command.playerId)}>{async()=>{return await this.props.getPlayerName(command.playerid)}}</strong> | {command.msg} </body> </div>);
}

parseSystemMessage(command){
  return(<div className="systemMessage"><body>{command.msg}</body></div>)
}

parseTypingMessage(command){
    return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} is typing...</body></div>)
}
parseRoleMessage(command){
  if(command.action === 1){
    var playerid = command.playerid;
    this.props.removePlayer(playerid);
    this.props.addGraveyard({name: playerid, playerid: playerid,roleid:command.role});
    this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(playerid)}} has been sent to the guillotine. </body></div>)]})
    return;
  }
  if(command.action === 2){
    if(command.alignment === 1){
      this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>After investigations, you suspect that {async()=>{return await this.props.getPlayerName(playerid)}} is sided with the mafia.</body></div>)]})
      return;
    }
    else{
      this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>After investigations, you suspect that {async()=>{return await this.props.getPlayerName(playerid)}} is sided with the village.</body></div>)]})
      return;
    }
  }
  if(command.action === 3){
    this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>A bullet hits your vest! You cannot survive another hit!</body></div>)]})
  }
  if(command.action === 4){
    this.setState({messagesQueue: [...this.state.messagesQueue, (<div className="systemMessage"><body>You learned that {async()=>{return await this.props.getPlayerName(playerid)}} is {utils.resolveRoleString(command.role)}! </body></div>)]})
  }
}

parseNotTypingMessage(command){
    //hidebubble
    return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} has stopped typing!</body></div>)
}

parseLeaveMessage(command){
    return(<div className="systemMessage"><body>{async()=>{return await this.props.getPlayerName(command.playerid)}} has left the game!</body></div>)
}

handleType(event) {
   this.setState({msgText: event.target.value});
   var command = {};
   if(this.state.msgText.length === 1){
   command.cmd = -1;
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

  messages.map(message => {
    let messageElement;
    var command = JSON.parse(message);
    if(command.cmd === -4){
      alert('game over');
    }
    if(command.cmd === -3){
      this.props.setPlayerId(command.playerId)
    }
    if(command.cmd === -2){
      messageElement = this.parseNotTypingMessage(command);
    }
    if(command.cmd === -1){
      messageElement = this.parseTypingMessage(command);
    }
    if(command.cmd === 0){
      messageElement = this.parsePlayerMessage(command);
    }
    if(command.cmd === 1){
      messageElement = this.parseSystemMessage(command);
    }
    if(command.cmd === 2){
      messageElement = this.parseVoteMessage(command);
    }
    if(command.cmd === 3){
      messageElement = this.parseRoleMessage(command)
    }
    if(command.cmd === 4){
      this.props.setRoleID(command.role);
      messageElement = this.getRoleDetails(command.role);
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
      messageElement = this.parseLeaveMessage(command);
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
      this.props.addPlayer({name: command.playerid, playerid:  command.playerid})
    }
    if(command.cmd === 9){
      this.parseSettingsMessage(command);
    }
    messages.shift();
    this.setState({messages: [...this.state.messages, messageElement]})
  });
var chatContainer = document.getElementsByClassName('chatContainer')[0];
if(chatContainer){
  chatContainer.scrollBy(0,Number.MAX_SAFE_INTEGER);
}
var displayedMessages;
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
  <input type="text" placeholder="Enter a message here..." value={this.state.msgText} onKeyDown={this.typingMessage} onChange={this.handleType}/>
</form>
</div>
  </div>
);
}
}


export default ChatContainer;
