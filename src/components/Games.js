import React, {Component} from 'react';
import "../css/Games.css"

class Games extends Component{
    constructor(props){
	super(props);
	this.state={
	}
    }


    render(){
	return(
	    <div style={{width:"60%", marginLeft:"100px", marginTop:"22px", border: "1px solid", borderRadius:"0px 15px 0px 0px", backgroundColor:'white'}}>
		<div className="lobbyHeader">
		    <div className="lobbies">
			<div className="lobby">
			    <p> All Lobbies </p> 
			</div>
			<div className="lobby">
			    <p> Main </p> 
			</div>
			<div className="lobby">
			    <p> Sandbox </p> 
			</div>
			<div className="lobby">
			    <p> Forum Games </p> 
			</div>
		    </div>
		</div>
	    </div>
	)
    }

}

export default Games;
