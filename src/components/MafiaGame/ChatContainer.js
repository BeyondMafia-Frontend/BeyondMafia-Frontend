import React, {Component} from 'react';
import './css/ChatContainer.css'
class ChatContainer extends Component {
  constructor(props){
      super(props);
	  this.state = {
      typing: false,
      typingDisabled: false,
      msgText: '',
      }
      this.handleType = this.handleType.bind(this);
      this.handleSendMessage = this.handleSendMessage.bind(this);
      this.parseTypingMessage = this.parseTypingMessage.bind(this);
      this.parseNotTypingMessage = this.parseNotTypingMessage.bind(this);
}

sendTypingCommand = websocket => () => {
  websocket.send(JSON.stringify({
    cmd: 'typing',
    value: this.state.typing
  })
);
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

parsePlayerMessage(command){
 return (<div className="playerChat"><img className="chatImage" src={"/static/media/kfy8nir1jq131.5c2dc0c7.jpg"} /> <body> <strong onClick={this.handlePlayerClick(command.playerId)}>{command.playerId}</strong> | {command.msg} </body> </div>);
}

parseSystemMessage(command){
  return(<div className="systemMessage"><body>{command.msg}</body></div>)
}

parseTypingMessage(command){
    return(<div className="systemMessage"><body>{command.playerId} is typing...</body></div>)
}

parseNotTypingMessage(command){
    return(<div className="systemMessage"><body>{command.playerId} has stopped typing!</body></div>)
}

handleType(event) {
   this.setState({msgText: event.target.value});
   var command = {}
   if(!this.state.typingDisabled && this.state.msgText.length > 0 && this.state.typing === false){
     this.setState({typing:true});
     command.cmd = -1;
     this.props.sendMessage(JSON.stringify(command));
   }
   if(!this.state.typingDisabled && this.state.msgText.length === 0 && this.state.typing === true){
     command.cmd = -2;
     this.props.sendMessage(JSON.stringify(command));
   }

 }

 handleSendMessage(event) {
   this.setState({typing:false});
   var command = {cmd: 0, msg: this.state.msgText};
   this.props.sendMessage(JSON.stringify(command));
   this.setState({msgText:''});
    event.preventDefault();
    }


render(){
  var {messages} = this.props;
  var messagesArr = [];
  messages.map(message => {
    let messageElement;
    var command = JSON.parse(message);
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
    messagesArr.push(
      messageElement
    )
  }
);
var chatContainer = window.document.getElementsByClassName('chatContainer')[0];
  if(chatContainer&& chatContainer.childElementCount > 0){
  chatContainer.children[chatContainer.childElementCount-1].scrollIntoView();
}
  return(
  <div>
  <div className="chatContainer">
  {messagesArr}
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
