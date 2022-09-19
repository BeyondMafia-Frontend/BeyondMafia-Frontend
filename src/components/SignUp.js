import React, {Component} from 'react';
import '../css/SignUp.css'
import SignUpForm from './SignUpForm.js'
class SignUp extends Component {
  constructor(props){
    super(props);
      this.state = {
      }
  }

  render(){
  return(
    <div>

	<div id="signHeader" style={{paddingTop:"20px"}, {overflow:"auto"}}>

	    <div id="createAccountForm">
      <div id="createAccount">

    <div id ="logo">
        <img
      src="/assets/logo-light.png"
      id="logoLight"
      alt="BeyondMafia"
        />
    </div>

    <div id="headerText">
        <p> CREATE A FREE ACCOUNT </p>
    </div>
      </div>
		<SignUpForm />
	    </div>
    </div>
</div> );
  }
}

export default SignUp;
