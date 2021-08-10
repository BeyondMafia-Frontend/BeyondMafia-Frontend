import React, {Component} from 'react';
import '../css/SignUpForm.css'
import Recaptcha from './Recaptcha.js'

class SignUpForm extends Component {
  constructor(props){
      super(props);
      this.state = {
      recaptcha: '',
      email: '',
      username: '',
      password: '',
	  confirmPassword: '',
	  gender: -1,
	  pronouns: -1,
      referrer: '',
      experience: -1,
      avatar: 1,
    }
  }

render(){
  return(
<div className="signupBox">
                <div className="formBox">
                    <form onSubmit={console.log(this.state)}>
                        <input type="email" placeholder="EMAIL" onChange={e=> this.setState({email:e.target.value})}  />
			<input type="text"  placeholder="USERNAME" onChange={e=> this.setState({username:e.target.value})}  />			
                        <input type="password" placeholder="PASSWORD" onChange={e=> this.setState({password:e.target.value})}/>
                        <input type="password" placeholder="CONFIRM PASSWORD" onChange={e=> this.setState({confirmPassword:e.target.value})}/>
			<h2> OPTIONAL </h2>
			<input type="text" placeholder="REFERRER" onChange={e=>this.setState({referrer:e.target.value})} />

			<select id="genderDropdown" name="GENDER" onChange={e=>this.setState({gender:e.target.value})}>
			    <option value={-1} disabled selected > GENDER </option>
			    <option value={0}>Male</option>
			    <option value={1}> Female </option>

			    </select>

			<select id="pronounsDropdown" name="PRONOUNS" onChange={e=>this.setState({pronouns:e.target.value})}>
			    <option value={-1} disabled selected> PRONOUNS </option>
			    <option value={0}>He/Him </option>
			    <option value={1}>She/Her</option>
			    <option value={2}>They/Them</option>

			    </select>

                        <input type="submit" value="Sign Up" />

			
                        <p className="signup">Already have an Account? <a href="#" onclick="">Login</a></p>
                    </form>
		</div>
    
    <div className="formBox">
	<h2 className="prompt"> WHAT IS YOUR EXPERIENCE PLAYING MAFIA? </h2>
	<form>
	    <div className="experience">
		<input type="radio" id="opt1" name="exp" value={0} onChange={e=>this.setState({experience: e.target.value})}/>
  <label for="opt1">Brand New - I have never played or only a few times on a different medium.</label>
		<input type="radio" id="opt2" name="exp"  value={1} onChange={e=>this.setState({experience: e.target.value})}/>
  <label for="opt2">Semi-Experienced - I have played a little bit of chat and/or forum mafia.</label>
		<input type="radio" id="opt3" name="exp" value={2} onChange={e=>this.setState({experience: e.target.value})}/>
		<label for="opt3">Great Pro - I have played chat and/or forum mafia extensively</label>
		</div>
	</form>
	
	<h2 className="prompt" style={{marginTop:"38px"}}> CHOOSE AN AVATAR </h2>


	<Recaptcha />
	</div>



    
			    </div>
);
}
}

export default SignUpForm;
