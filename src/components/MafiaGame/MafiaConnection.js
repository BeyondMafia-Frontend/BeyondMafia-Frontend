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
  }
};

socket.onmessage = (event) =>{
    this.onMessage(event.data)
};

socket.onclose = function(event) {
  if (event.wasClean) {
    window.alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    window.alert('[close] Connection died');
  }
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
