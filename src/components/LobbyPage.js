import React, {Component} from 'react';
import MafiaHeader from './MafiaHeader.js'
import Announcements from './Announcements.js'

class LobbyPage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }  
  }

render(){
  return(
	  <div>
	      <MafiaHeader />
	      <Announcements />
	  </div>
  );
}
}

export default LobbyPage;
