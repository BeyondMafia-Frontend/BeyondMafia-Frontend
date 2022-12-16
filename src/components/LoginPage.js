import React, {Component} from 'react';
import { withRouter } from "react-router";
import '../css/PlayerPage.css'
import '../css/Login.css'
import 'react-responsive-modal/styles.css';
import Modal from "react-responsive-modal";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class LogIn extends Component {
    constructor(props){
      var cookies = new Cookies();
      super(props);
        this.state = {
            playerid : -1,
            cookies : cookies,
            open:false
        }

    }
    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

    render(){
    return(
        <div class='login_container'>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover={false}
theme="light"
/>
        <div class='header'>
        <img
			    src="/assets/logo-light.png"
			    id="logoLightplayer"
			    alt="BeyondMafia"

		    />
        <a class='nav-links'href='/lobby'>L O B B Y</a>
        <p class='nav-divider'>|</p>
        {parseInt(this.state.playerid) === parseInt(this.state.currentId)
        ?
        <a class='nav-links-highlighted'>P L A Y E R</a>
        : this.state.playerid === -1
          ?<a class='nav-links'>P L A Y E R</a>
          :<a class='nav-links' href={'/players/'+this.state.playerid.toString()}>P L A Y E R</a>
        }
        <p class='nav-divider'>|</p>
        <a class='nav-links'>R O U N D</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links' >F O R U M</a>
        <p class='nav-divider'>|</p>
        <a class='nav-links'>L E A R N</a>
        <img src="/assets/default-avis/neurondark.png" id="player-pfp" alt="BeyondMafia"/>
        </div>
        <Modal classNames={{"modal":"loginModal"}} open={this.state.open} onClose={this.onCloseModal} center>
        <div className="loginBox">
              <form >
                <input type="username" placeholder="USERNAME" onChange={e=> this.setState({username:e.target.value})}  />
                <input type="password"  placeholder="PASSWORD" onChange={e=> this.setState({password:e.target.value})}  />
                <input type="button" onClick={async ()=>{
                  var sendJSON = {};
                  sendJSON.username = this.state.username;
                  sendJSON.password = this.state.password;
                  const rawResponse = await fetch('http://localhost:3001/users/login',{
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(sendJSON)
                    });
                    const content = await rawResponse.json()
                    if(content['0'] === 1){
                    this.state.cookies.set("bmcookie",content.cookie);
                    window.location.href = "../lobby";
                  }
                  else{
                    toast("Error with username / password combination.")
                  }
              }}value="LOG IN" />
                </form>
                <a href ="/signUp"> No Account? </a>

</div>
     </Modal>
        <div class="splash">
        <div class="splashHolder">
            <img id="splash" src="/assets/login_header.png" alt="login pic"/>
                <button onClick={()=>{
                  this.setState({open:true});
                }} id="login">LOG IN</button>
        </div>
        </div>
        <div class="play">
        <a href='/lobby'>
        <img src="/assets/playMafia.png" id="playButton" alt="play mafia button"/>
        </a>
        <p style={{width:"50%"}}> BeyondMafia is the mafia site that is revolutionary in design, safety,
        and has a thriving community of users from all walks of life all over the world.
        With competitive and casual chat and forum mafia, and other gamemodes like survivor,
        you're sure to find something that suits how YOU want to play!</p>
        <div className="loginSecondRow">
        <div className="forumMafia">
        <img src="/assets/forum.png"  id="lobbyPic" alt="Forum Mafia picture"/>
        <p style={{width:"50%"}}>Play mafia in the forums! Host your
        own game, or use BeyondBot to host one for you.</p>
        </div>
        <div className="chatMafia">


          <img src="/assets/chat.png"  id="lobbyPic" alt="Chat Mafia picture"/>
        <p style={{width:"50%"}}>10-20~ minute games with a variety of roles!
                Play with classic roles, or try out something different in the Sandbox lobby. You can
                create your own custom roles too with the Role Builder!</p>
        </div>
        </div>
        </div>
        <div className="otherModes">
          <img src="/assets/other.png" id="lobbyPic" alt="Other game modes picture"/>
        <p style={{width:"25%"}}>Explore other mafia-esque games like Survivor,
        or have a break with minigames such as Ghost or battle snakes</p>
        </div>
        <div class="play">
        <a href='/lobby'>
        <img src="/assets/playMafia.png" id="playButton" alt="play mafia button"/>
        </a>
        </div>


        </div>
      );
    }
  }

  export default LogIn;
