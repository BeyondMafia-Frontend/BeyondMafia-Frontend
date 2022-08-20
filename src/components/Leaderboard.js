import React, {Component} from 'react';
import '../css/Leaderboard.css'
import knife from '../assets/knife.png'
import{
    Link 
} from "react-router-dom"

class Leaderboard extends Component {
  constructor(props){
    super(props);
      this.state = {
	  leaders: [],
	  doneLoading: false,
    }
  }
    componentDidMount(){
	{/*Change this to the announcement endpoint in production*/} 
	fetch("https://httpbin.org/get")
	    .then(resp => resp.json())
	    .then(data=> {
		window.setTimeout(()=>{
		  ///  this.setState({doneLoading:true})
		}, 5000)
	    }
		 )
    }
    
    render(){
	
	const leaderboardDisplay = () => {
	switch(this.state.doneLoading){
	case true:
	    let leadersElement;
	    {/*message should have account user id associated with post, thats how profile link and profile image get resolved*/} 
	    this.state.leaders.map(message =>{
		leadersElement.push(
		    <div className="leader">
			<div className="user">
	 		    <Link className="userLink" to={`/users/${message.userId}`}>
				<img src={`/users/${message.userid}.png`}
				     width="100"
				     height="100"
				/>
				<p> {message.userName} </p>
			    </Link>
			    <div className="score">
				{/*TODO: Display whatever vectors are used to compute the leaders, i.e. score, trophies, etc.*/}
				
			    </div>
			</div>
		    </div>
			    )
	    });
	    return leadersElement;
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
      <div className="leaderboard">
	  <div className="title" >
	      <h1> Leaderboard</h1>
	  <div className="leaderboardDisplay">
	      {leaderboardDisplay()}
	      </div>
	  </div>
</div>
);
}
}

export default Leaderboard;
