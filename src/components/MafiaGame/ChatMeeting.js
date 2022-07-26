import React, {Component} from 'react';
import "./css/ChatMeeting.css"
import dropDown from "./assets/caret-square-down.svg"
import role from './assets/default-role.png'
class ChatMeeting extends Component {
  constructor(props){
      super(props);
	  this.state = {
	      votedPlayer: 0,
	      votingListHovered: false,
	      meetingName: "Vilage"
	  }
      this.handleMeetingVote =  this.handleMeetingVote.bind(this);
      this.getMeetingVote = this.getMeetingVote.bind(this);
  }
      handleMeetingVote = playerID => () =>{
	  {/* should also send a websocket message to game server to indicate vote state */}
	  this.setState({votedPlayer:playerID});
      }

getMeetingVote(uuid){
  return this.props.votes[uuid];
}
    render(){
	{/* members will contain the js obj list of applicable votes */}
	var {members} = this.props;
	let memberArray = [];
	let votingList = [];
	members.map(member =>{
      var uuid = this.getMeetingVote(member.playerid);
	    if(!uuid || uuid === -1){
	    memberArray.push(
		<div className="meetingMember" onClick={() =>{this.props.sendVote(member.playerid)}}>
		    <div key={member.playerid} className="memberName"><span style={{color:"#C52213"}}> {member.name}</span> </div>
		</div>
	    )
	    }
      else if(uuid === -2){
        memberArray.push(
  		<div className="meetingMember" onClick={() =>{this.props.sendVote(member.playerid)}}>
  		    <div key={member.playerid} className="memberName"><span style={{color:"#C52213"}}> {member.name}</span> votes no one </div>
  		</div>
  	    )
      }
		    else{
		    memberArray.push(
			<div className="meetingMember" onClick={() =>{this.props.sendVote(member.playerid)}}>
			    <div key={member.playerid} className="memberName"><span style={{color:"#C52213"}}> {member.name}  </span> votes {uuid}  </div>
			</div>)
      }
	    if(this.state.votingListHovered){
		votingList.push(
		    <div key={member.playerid} className="playerVote" onClick={() =>{this.props.sendVote(member.playerid)}}>

		    {/*should use playerid to get image of photo*/}
		    <img src={role} className="votingImage" width="25" length="25" />
		    <span> {member.name} </span>
		    </div>

		    )
		    }
	})
  if(this.state.votingListHovered){
    votingList.push(<div className="playerVote" onClick={() =>{
      var playerid = -2;
      this.props.sendVote(playerid)}}>
    <span> No one </span>
    </div>)
  }

	return(
	    <div>
		<h1> {this.state.meetingName} Meeting </h1>
		{memberArray}

		<div className="voteToggle"
		     onMouseEnter={()=> this.setState({votingListHovered:true})}
		     onMouseLeave={()=> this.setState({votingListHovered:false})} >
		    <img src={dropDown} height="25" width="25" className="dropDown"/>
		    <span>Pick a player</span>

		    <div className={this.state.votingListHovered ? "votingList" : "votingList-nb"}>
			 {votingList}
			 </div>
		</div>

	    </div>
	);
    }
}

export default ChatMeeting;
