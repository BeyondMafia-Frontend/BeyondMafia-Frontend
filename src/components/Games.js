import React, {Component} from 'react';
import "../css/Games.css"
import knife from '../assets/knife.png'

class Games extends Component{
    constructor(props){
	super(props);
	this.state={
	    doneLoading: false,
	}
    }
    

    render(){
	const gameDisplay = () => {
	switch(this.state.doneLoading){
	case true:
	    return;
	default:
	    var spinner = <div className="loading">
		<img src={knife}
		     className="spinner"
		     width="100px"
		     height="100px"
		     />
			  </div>
	    return spinner;
	}
	}
	
	return(
	    <div style={{width:"60%", marginLeft:"100px", marginTop:"22px", border: "1px solid", borderRadius:"0px 15px 0px 0px", backgroundColor:'white'}}>
		<div className="lobbyHeader">
		    <div className="lobbies">
			<div className="lobby">
			    <p className="lobbyName"> All Lobbies </p> 
			</div>
			<div className="lobby">
			    <p className="lobbyName"> Main </p> 
			</div>
			<div className="lobby">
			    <p className="lobbyName"> Sandbox </p> 
			</div>
			<div className="lobby">
			    <p className="lobbyName"> Forum Games </p> 
			</div>
		    </div>
		    {gameDisplay()}
		</div>
	    </div>
	)
    }

}

export default Games;
