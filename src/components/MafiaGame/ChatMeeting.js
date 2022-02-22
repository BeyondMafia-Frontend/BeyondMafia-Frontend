import React, {Component} from 'react';
import "./css/ChatMeeting.css"

class ChatMeeting extends Component {
  constructor(props){
      super(props);
	  this.state = {
	      votedPlayer: 0,
	      meetingName: "Vilage"
	  }
      this.handleMeetingVote =  this.handleMeetingVote.bind(this);
  }
      handleMeetingVote = playerID => () =>{
	  {/* should also send a websocket message to game server to indicate vote state */} 
	  this.setState({votedPlayer:playerID});  
      }
 
    render(){
	{/* members will contain the js obj list of applicable votes */} 
	var {members} = this.props;
	let memberArray = [];
	members.map(member =>{
	    if(!member.votedPlayer){
	    memberArray.push(
		
		<div className="meetingMember" onClick={this.handleMeetingVote(member.id)}>
		    <div className="memberName"><span style={{color:"#C52213"}}> {member.name}</span> </div>
		</div>
	    )
	    }
		else{
		    memberArray.push(
			<div className="meetingMember" onClick={this.handleMeetingVote(member.id)}>
			    <div className="memberName"><span style={{color:"#C52213"}}> {member.name} </span>  votes {member.currentVote} </div>
			</div>
		    )
		}
	})
	console.log(memberArray);
	return(
	    <div>
		<h1> {this.state.meetingName} Meeting </h1>
		{memberArray}
		<div className="voteToggle">

		    
		</div>
		
	    </div>	
	);
    }
}

export default ChatMeeting;
