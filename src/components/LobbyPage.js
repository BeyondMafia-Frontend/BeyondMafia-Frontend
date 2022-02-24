import React, {Component} from 'react';
import MafiaHeader from './MafiaHeader.js'
import Announcements from './Announcements.js'
import Leaderboard from './Leaderboard.js'
import Competitive from './Competitive.js'
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
	      <div className="info" style={{display:"flex", flexFlow:"column", gap:"15px"}}>
		  <Announcements />
		  <div className="divide" style={{paddingTop:'10px'}}>
		  </div>
		      
		  <Leaderboard/ >
		  <div className="divide" style={{paddingTop:'10px'}}>
		  </div>

		  <Competitive />
		  </div>
	  </div>
  );
}
}

export default LobbyPage;
