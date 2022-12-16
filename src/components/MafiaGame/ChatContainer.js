import React, {Component} from 'react';
import './css/ChatContainer.css'
import * as utils from '../utils/image-resolver.js';
class ChatContainer extends Component {
  constructor(props){
      super(props);
      this.messages = [];
      this.messageQueue = [];
      this.messageBank = {};
      this.parsedMessageCount = 0;
      this.parsing = false;
	  this.state = {
      reading: false,
      messagesQueue:[],
      messageBank:{},
      messageCount:-1,
      scroll:true,
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
      this.clearChat = this.clearChat.bind(this);
      this.parseMessages = this.parseMessages.bind(this);
}


parseMessages(){
  var {messages} = this.props;
  if(!this.state.parsed && !this.parsing){
    messages.find((message,index)=>{
    var command = JSON.parse(message);
    if(command.cmd === 9){
        this.parseSettingsMessage(command);
    }
    });
  }
  if(this.state.parsed){
  if(!this.chat){
    this.chat = document.getElementsByClassName('chatContainer')[0];
  }
  if(!this.chat || Math.floor(this.chat.scrollTop) <= (this.chat.scrollHeight - this.chat.offsetHeight)+1 && Math.floor(this.chat.scrollTop) >=(this.chat.scrollHeight - this.chat.offsetHeight)-1){
     this.scroll = true;
  }
  else{
    this.scroll = false;
  }
  for(var i = this.parsedMessageCount; i < messages.length;i++){
    var command = JSON.parse(messages[i]);
    var messageElement;
    if(command.cmd === -9){
        this.messages.push((<div className="systemMessage"><body>Game is starting..</body></div>))
    }
    if(command.cmd === -7){
      this.messages.push(<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} has left the game!</body></div>)
      this.props.removePlayer(command.playerid)
    }
    if(command.cmd === -6){
      this.messages.push((<div className="systemMessage"><body>{this.props.getPlayerName(command.playerid)} has deserted the village...</body></div>))
      this.props.removePlayer(command.playerid)
      this.props.addGraveyard({name: this.props.getPlayerName(command.playerid), playerid: command.playerid,roleid:command.role});
    }
    if(command.cmd === -5){
      this.props.displayKicks(command.count);
    }
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
      this.messages.push(this.parsePlayerMessage(command))
    }
    if(command.cmd === 1){
      this.parseVoteMessage(command)
      this.messages.push(this.parseSystemMessage(command))
    }
    if(command.cmd === 2){
        this.messages.push(this.parseVoteMessage(command))
    }
    if(command.cmd === 3){
      this.messages.push(this.parseRoleMessage(command))
    }
    if(command.cmd === 4){
      this.props.setRoleID(command.role);
      this.messages.push(this.getRoleDetails(command.role))
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
      this.messages.push(this.getRoleDetails(command.role))
    }
    if(command.cmd === 7){
      this.setState({currentGameState:command.state});
      this.props.updateGameState(command.state);
      this.iterateMessages(command.state);
      this.props.setMessageBankLength(Object.keys(this.messageBank).length);
      messages.shift();
      return;
    }
    if(command.cmd === 8){
      this.props.addPlayer(command.playerid)
    }
    if(command.cmd === -5){
      this.props.displayKicks(command.count);
    }
    if(command.cmd === -4){
      alert('game over');
    }

    if(command.cmd === -3){
      this.props.setPlayerId(command.playerId)
    }
    this.parsedMessageCount++;
}
}
}

 iterateMessages(gameState){
   this.messageBank[gameState.toString()] = this.messages;
   this.messages = this.messageQueue;
   this.messageQueue = [];
}
clearChat(){
  this.setState({
    reading: false,
    messages:[],
    messagesQueue:[],
    messageBank:{},
    messageCount:-1,
    scroll:true,
    typing: undefined,
    parsed:false,
    typingDisabled: false,
    msgText: '',
    completed: false,
  });
}

componentWillUnmount(){
    window.addEventListener('beforeunload', this.clearChat);
  this.clearChat();
}

getRoleDetails(roleID){
  let role = utils.resolveRoleString(roleID);
  return(<div className="systemMessage"><body>You have been assigned the {role}!</body></div>)
}
handleScroll(){
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
   this.parsing = true;
  this.props.setGameSettings(command).then(()=>{
    this.setState({currentGameState:command.state,parsed:true});
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
    this.props.addGraveyard({name: this.props.getPlayerName(playerid), playerid: playerid,roleid:command.role});
    if(this.props.currentGameState % 2 !== 0){
    this.messageQueue.push((<div className="systemMessage"><body>{this.props.getPlayerName(playerid)} has been sent to the guillotine. </body></div>));
    return;
  }
  else{
    this.messages.push((<div className="systemMessage"><body>{this.props.getPlayerName(playerid)} has been sent to the guillotine. </body></div>));
  }
  }
  if(command.action === 2){
    if(command.alignment === 1){
      if(this.props.currentGameState % 2 !== 0){
        this.messageQueue.push((<div className="systemMessage"><body>After investigations, you suspect that {this.props.getPlayerName(playerid)} is sided with the mafia.</body></div>));
      return;
    }
    else{
      this.messages.push((<div className="systemMessage"><body>After investigations, you suspect that {this.props.getPlayerName(playerid)} is sided with the mafia.</body></div>));
    }
    }
    else{
      if(this.props.currentGameState % 2 !== 0){
      this.messageQueue.push((<div className="systemMessage"><body>After investigations, you suspect that {this.props.getPlayerName(playerid)} is sided with the village.</body></div>));
      return;
    }
    else{
      this.messages.push((<div className="systemMessage"><body>After investigations, you suspect that {this.props.getPlayerName(playerid)} is sided with the village.</body></div>));
    }
    }
  }
  if(command.action === 3){
    if(this.props.currentGameState % 2 !== 0){
        this.messageQueue.push((<div className="systemMessage"><body>A bullet hits your vest! You cannot survive another hit!</body></div>));
  }
  else{
        this.messages.push((<div className="systemMessage"><body>A bullet hits your vest! You cannot survive another hit!</body></div>));
  }
  }
  if(command.action === 4){
    if(this.props.currentGameState % 2 !== 0){
      this.messageQueue.push((<div className="systemMessage"><body>You learned that {this.props.getPlayerName(playerid)} is {utils.resolveRoleString(command.role)}! </body></div>));
  }
  else{
      this.messageQueue.push((<div className="systemMessage"><body>You learned that {this.props.getPlayerName(playerid)} is {utils.resolveRoleString(command.role)}! </body></div>));
  }
  }
  if(command.action === 5){
    var playerString = "";
    for(var i = 0; i < command.playerids.length;i++){
      if(i != 0&&i+1 === command.playerids.length){
        playerString += ' and '
      }
      else if(i > 0){
        playerString += ', ';
      }
      playerString += this.props.getPlayerName(command.playerids[i]);
    }
    if (this.props.currentGameState % 2 !== 0) {
      if (command.playerids.length === 0) {
          this.messageQueue.push((<div className="systemMessage"><body>You watched {this.props.getPlayerName(playerid)} throughout the night, no one has visited {this.props.getPlayerName(playerid)}. </body></div>))
      }
      else{
          this.messages.push((<div className="systemMessage"><body>You watched {this.props.getPlayerName(playerid)} throughout the night, {playerString} has visited {this.props.getPlayerName(playerid)}. </body></div>))
        }
      }
  else {
    if (command.playerids.length === 0) {
        this.messageQueue.push((<div className="systemMessage"><body>You watched {this.props.getPlayerName(playerid)} throughout the night, no one has visited {this.props.getPlayerName(playerid)}. </body></div>))
    }
    else{
        this.messages.push((<div className="systemMessage"><body>You watched {this.props.getPlayerName(playerid)} throughout the night, {playerString} has visited {this.props.getPlayerName(playerid)}. </body></div>))
      }
  }
  }
  if(command.action === 6){
    var playerString = "";
    for(var i = 0; i < command.playerids.length;i++){
      if(i != 0&&i+1 === command.playerids.length){
        playerString += ' and '
      }
      else if(i > 0){
        playerString += ', ';
      }
      playerString += this.props.getPlayerName(command.playerids[i]);
    }
    if(this.props.currentGameState % 2 !== 0){
      if (command.playerids.length === 0) {
          this.messageQueue.push( (<div className="systemMessage"><body>You tracked {this.props.getPlayerName(playerid)} throughout the night, they have visited {playerString}. </body></div>));
      }
      else {
            this.messagesQueue.push((<div className="systemMessage"><body>You tracked {this.props.getPlayerName(playerid)} throughout the night, they have visited {playerString}. </body></div>));
      }
    }
  else{
    if (command.playerids.length === 0) {
        this.messages.push( (<div className="systemMessage"><body>You tracked {this.props.getPlayerName(playerid)} throughout the night, they have visited {playerString}. </body></div>));
    }
    else {
          this.messages.push((<div className="systemMessage"><body>You tracked {this.props.getPlayerName(playerid)} throughout the night, they have visited {playerString}. </body></div>));
    }
  }
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


componentDidUpdate(){
  if(this.scroll){
      var node = window.document.getElementsByClassName("chatContainer")[0];
      if (node !== undefined) {
        node.scrollTop = node.scrollHeight;
      }
    }
}
 render(){
  var messagesArr = [];
var displayedMessages;
this.parseMessages();
/*
  messages.map((message) => {
    let messageElement;
    try{
    var command = JSON.parse(message);
  catch(e){
      messages.shift();
  }
    messages.shift();
  });
  */
if(this.props.selectedGameState === -1 || this.props.selectedGameState === this.props.currentGameState){
  displayedMessages = this.messages;
}
else{
  displayedMessages = this.messageBank[(this.props.selectedGameState+1).toString()];
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
