import React, {Component} from 'react';
import '../css/Announcements.css'
import knife from '../assets/knife.png'
import{
    Link 
} from "react-router-dom"

class Announcements extends Component {
  constructor(props){
    super(props);
      this.state = {
	  messages: [],
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
	
	const announcementDisplay = () => {
	switch(this.state.doneLoading){
	case true:
	    let messagesElement;
	    {/*message should have account user id associated with post, thats how profile link and profile image get resolved*/} 
	    this.state.messages.map(message =>{
		messagesElement.push(
		    <div className="message">
			<p className="messageText">
			    {message.text}
			</p>
			<div className="user">
	 		    <Link className="userLink" to={`/users/${message.userId}`}>
				<img src={`/users/${message.userid}.png`}
				     width="100"
				     height="100"
				/>
				<p> {message.userName} </p>
			    </Link>
			    <div className="timestamp">
				{/*TODO conversion of UNIX timestamp difference of current time*/}
				
			    </div>
			</div>
		    </div>
			    )
	    });
	    return messagesElement;
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
      <div className="announcements">
	  <div className="title" >
	      <h1> Annoucements</h1>
	  <div className="announcementDisplay">
	      {announcementDisplay()}
	      </div>
	  </div>
</div>
);
}
}

export default Announcements;
