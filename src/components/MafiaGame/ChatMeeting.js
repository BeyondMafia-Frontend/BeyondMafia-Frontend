import React, {Component} from 'react';
import "./css/ChatMeeting.css"
import * as utils from '../utils/image-resolver.js';
var dropDown = "/assets/caret-square-down.svg"
var role = '/assets/roles/default-role.png';
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
  if(!Object.keys(this.props.votes).includes(uuid.toString())){
    return undefined;
  }
  var votes = this.props.votes[uuid.toString()];
  if(votes.length !== 0){
    var check = false;
    for(var i = 0; i < votes.length;i++){
      if(votes[i].roleAction === this.props.role){
        check = true;
        break;
      }
    }
    if(check === false){
      return undefined;
    }
  }
  return this.props.votes[uuid.toString()];
}
    render(){
	{/* members will contain the js obj list of applicable votes */}
	var {members} = this.props;
	let memberArray = [];
	let votingList = [];
  var roleString;
	members.map((playerid) =>{
      var votes = this.getMeetingVote(playerid);
	    if(votes === undefined){
        memberArray.push(
      <div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
          <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {this.props.getPlayerName(playerid)}</span> </div>
      </div>
    )
	    }
      else{
      votes.forEach((vote) => {
        if(vote.target === -1 && vote.roleAction == this.props.role){
        memberArray.push(
      <div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
          <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {this.props.getPlayerName(playerid)}</span> </div>
      </div>
        )
        }
        else if((vote.roleAction == this.props.role && vote.target === 18446744073709551614)){
          memberArray.push(
    		<div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
    		    <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {this.props.getPlayerName(playerid)}</span> votes no one </div>
    		</div>
    	    )
        }
        else if(vote.roleAction == this.props.role){
		    memberArray.push(
			<div className="meetingMember" onClick={() =>{this.props.sendVote(playerid,this.props.role)}}>
			    <div key={playerid} className="memberName"><span style={{color:"#C52213"}}> {this.props.getPlayerName(playerid)}  </span> votes {this.props.getPlayerName(vote.target)}  </div>
			</div>)
      }
    });
      }
	})
  if(this.state.votingListHovered){
    if(this.props.role === 0){
    this.props.players.forEach((player, i) => {
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {this.props.getPlayerName(player.playerid)} </span>
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
        <span> {this.props.getPlayerName(player.playerid)} </span>
        </div>

        )
      }
    })
  }
  if(this.props.role === 2){
    this.props.players.forEach((player, i) => {
      if(!this.props.members.includes(player.playerid)){
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {this.props.getPlayerName(player.playerid)} </span>
        </div>

        )
      }
    })
  }
  if(this.props.role === 4){
    this.props.players.forEach((player, i) => {
      if(!this.props.members.includes(player.playerid)){
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {this.props.getPlayerName(player.playerid)} </span>
        </div>

        )
      }
    })
  }
  if(this.props.role === 5){
    this.props.players.forEach((player, i) => {
      if(!this.props.members.includes(player.playerid)){
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {this.props.getPlayerName(player.playerid)} </span>
        </div>

        )
      }
    })
  }
  if(this.props.role === 16){
    this.props.players.forEach((player, i) => {
      if(!this.props.members.includes(player.playerid)){
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {this.props.getPlayerName(player.playerid)} </span>
        </div>

        )
      }
    })
  }
  if(this.props.role === 17){
    this.props.players.forEach((player, i) => {
      if(!this.props.members.includes(player.playerid)){
    votingList.push(
        <div key={player.playerid} className="playerVote" onClick={() =>{this.props.sendVote(player.playerid,this.props.role)}}>

        {/*should use playerid to get image of photo*/}
        <img src={role} className="votingImage" width="25" length="25" />
        <span> {this.props.getPlayerName(player.playerid)} </span>
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
	return(
	    <div>
		<h1> {utils.resolveRoleString(this.props.role)} Meeting </h1>
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
