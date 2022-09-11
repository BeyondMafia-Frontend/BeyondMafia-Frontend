import React, {Component} from 'react';
import "../css/MafiaHeader.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import {withRouter} from "react-router"

class MafiaHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

render(){
  return(
      <div className="MafiaHeader">

	  <div className="Links">
	      <Link to="/"><img src="/assets/logo-light.png" height="100%" width="200px" style={{marginLeft:"-60px"}}/> </Link>
	      <Link className="specialLink" to="/lobby"> <p className="headerLink"> Lobby </p></Link>

	      <p className="divder"> | </p>
	      <Link className="specialLink" to="/player">  <p className="headerLink"> Player </p> </Link>
	      <p className="divder"> | </p>
	      <Link className="specialLink" to="/round">  <p className="headerLink"> Round </p> </Link>
	      <p className="divder"> | </p>
	      <Link className="specialLink" to="/fourm">  <p className="headerLink"> Forum </p> </Link>
	      <p className="divder"> | </p>
	      <Link className="specialLink" to="/learn">  <p className="headerLink"> Learn </p> </Link>
	      </div>
</div>
);
}
}

export default MafiaHeader;
