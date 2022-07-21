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
	    <div style={{width:"60%", marginLeft:"100px", marginTop:"22px", border: "hidden", borderRadius:"0px 15px 0px 0px", backgroundColor:'white'}}>
		<div className="lobbyHeader">
			
		    <div className="lobbies">
			<div class="btn-group">
  				<button className='active'> All Lobbies </button>
  				<button> Main </button>
  				<button> Sandbox </button>
				<button> Form Games </button>
			</div>
			
		    </div>
		    {gameDisplay()}
		</div>
	    </div>
	)
    }

}

export default Games;
