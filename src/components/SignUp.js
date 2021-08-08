import React, {Component} from 'react';
import logo from '../assets/logo-light.png';
import '../css/SignUp.css'

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      recaptcha: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
      pronouns: '',
      referrer: '',
      experience: -1,
      avatar: 1,
    }
  }

  render(){
  return(
    <div>

	<div id="signHeader" style={{paddingTop:"20px"}}>
	    <div id="createAccount"> 

		<div id ="logo">
		    <img
			src={logo}
			id="logoLight"
			alt="BeyondMafia"
		    />
		</div>

		<div id="headerText">
		    <p> CREATE A FREE ACCOUNT </p>
		</div>
	    </div>

	    <div id="createAccountForm">
		</div>

	    
    </div>

</div> );
  }
}

export default SignUp;
