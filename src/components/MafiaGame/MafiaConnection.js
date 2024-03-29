import React, {Component} from 'react';

class MafiaConnection extends Component {
  constructor(props){
    super(props);
	  this.state = {
      ws: undefined
      }
      this.handleConnection = this.handleConnection.bind(this);
      this.onOpen = this.onOpen.bind(this);
      this.onMessage = this.onMessage.bind(this);
      this.getMessages = this.getMessages.bind(this);

}
componentDidMount(){
    this.handleConnection();
}

onOpen(socket){
  this.props.setSocket(socket);
}
onMessage(message){
  this.props.updateMessages(message);
}

getMessages(){
  return this.state.messages;
}

handleConnection(){
let websocketString = `ws://127.0.0.1:${this.props.websocketPort}`
let socket = new WebSocket(websocketString);

socket.onopen = (e) =>{
  if(e){
    this.onOpen(socket);
    socket.send(JSON.stringify({cmd:-3,auth:this.props.bmcookie}));
  }
};

socket.onmessage = (event) =>{
    this.onMessage(event.data)
};

socket.onclose = function(event) {
  window.location.href = "/lobby"
};

socket.onerror = function(error) {
  window.alert(`[error] ${error.message}`);
};
}

render(){
    return <> </>;
  }
}

export default MafiaConnection;
