import React, {Component} from 'react';
import '../css/Announcements.css'
import knife from '../assets/knife.png'
import{
    Link 
} from "react-router-dom"

class Competitive extends Component {
  constructor(props){
    super(props);
      this.state = {
	  competitions: [],
	  doneLoading: false,
    }
  }
    componentDidMount(){
	{/*Change this to the competitive endpoint in production*/} 
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
	
	const competitiveDisplay = () => {
	switch(this.state.doneLoading){
	case true:
	    let competitionElements;
	    {/*message should have account user id associated with post, thats how profile link and profile image get resolved*/} 
	    this.state.competitions.map(competition =>{
		competitionElements.push(
			<div className="competition">
	 		    <Link className="competitionLink" to={`/users/${competition.id}`}>
				<p> {competition.name} </p>
			    </Link>
			</div>			
			    )
	    });
	    return competitionElements;
	default:
	    var spinner = <div className="loading">
		<img src={knife}
		     className="spinner"
		     width="100px"
		     height="100px"
		     />
			  </div>
	    console.log("reached");
	    return spinner;
	}
	}

				  
  return(
      <div className="competitions">
	  <div className="title" >
	      <h1> Competitive</h1>
	  <div className="competitiveDisplay">
	      {competitiveDisplay()}
	      </div>
	  </div>
</div>
);
}
}

export default Competitive;
