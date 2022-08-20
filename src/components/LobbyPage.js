import React, {Component} from 'react';
import MafiaHeader from './MafiaHeader.js'
import Announcements from './Announcements.js'
import Leaderboard from './Leaderboard.js'
import Competitive from './Competitive.js'
import Games from './Games.js'
import Footer from './Footer'

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
		 
	      <div className="lobbyPage" style={{display:"flex", backgroundColor:"#efefee", width:"110%"}}>
		  
		  <div className="info" style={{display:"flex", flexFlow:"column", gap:"15px",marginLeft:"75px"}}>
		      <Announcements />
		      <div className="divide" style={{paddingTop:'50px'}}>
		      </div>
		      
		      <Leaderboard/ >
		      <div className="divide" style={{paddingTop:'50px'}}>
		      </div>

		      <Competitive />
		  </div>
		  <Games /> 
		  
	      </div>
		  <div className="divide" style={{paddingTop:'50px', backgroundColor:"rgb(239, 239, 238)", width:"110%"}}>
		      </div>

		  <Footer />
		  
	  </div>
	  
      
  );
}
}

export default LobbyPage;
