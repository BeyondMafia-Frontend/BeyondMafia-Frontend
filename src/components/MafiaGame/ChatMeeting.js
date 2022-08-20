import React, {Component} from 'react';
import "./css/ChatMeeting.css"
import dropDown from "./assets/caret-square-down.svg"
import role from './assets/roles/default-role.png'
class ChatMeeting extends Component {
  constructor(props){
      super(props);
	  this.state = {
	      votedPlayer: 0,
	      votingListHovered: false,
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
  var roleString;
	members.map(playerid =>{
      var uuid = this.getMeetingVote(playerid);
	    if(!uuid || uuid === -1){
	    memberArray.push(
		<div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
		    <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {playerid}</span> </div>
		</div>
	    )
	    }
      else if(uuid === 18446744073709551615){
        memberArray.push(
  		<div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
  		    <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {playerid}</span> votes no one </div>
  		</div>
  	    )
      }
		    else{
		    memberArray.push(
			<div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
			    <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {playerid}  </span> votes {uuid}  </div>
			</div>)
      }
	})
  if(this.state.votingListHovered){
    if(this.props.role === 0){
    this.props.players.forEach((player, i) => {
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {player.playerid} </span>
        </div>

        )
    })
  }
  if(this.props.role === 1){
    this.props.players.forEach((player, i) => {
      if(!this.props.members.includes(player.playerid)){
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {player.playerid} </span>
        </div>

        )
      }
    })
  }
    votingList.push(<div className="playerVote" onClick={() =>{
      var playerid = -2;
      this.props.sendVote(playerid,this.props.role)}}>
    <span> No one </span>
    </div>)
}
  if(this.props.role === 0){
  roleString = "Village";
  }
  else if(this.props.role === 1){
  roleString = "Mafia";
  }
	return(
	    <div>
		<h1> {roleString} Meeting </h1>
		{memberArray}

    {this.props.prev === false
		?<div className="voteToggle"
		     onMouseEnter={()=> this.setState({votingListHovered:true})}
		     onMouseLeave={()=> this.setState({votingListHovered:false})} >

		    <img src={dropDown} height="25" width="25" className="dropDown"/>
		    <span>Pick a player</span>

		    <div className={this.state.votingListHovered ? "votingList" : "votingList-nb"}>
			 {votingList}
			 </div>
		</div>
    :null
}
	    </div>
	);
    }
}

export default ChatMeeting;
