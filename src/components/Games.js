import React, {Component} from 'react';
import "../css/Games.css"
import * as utils from './utils/image-resolver.js';
class Games extends Component{
    constructor(props){
	super(props);
	this.state={
	    doneLoading: false,
      headerState: 1,
      currentRoles: [],
	}
  this.addRole = this.addRole.bind(this);
    }

addRole(role){
    this.setState({ currentRoles: [...this.state.currentRoles, role] });
}
    render(){
	const gameDisplay = () => {
	switch(this.props.games.length !== 0){
	case true:
      var gamesArr = [];
      this.props.games.map((games) => {
        var roles = [];
        var players = [];
        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        const set = new Set(games.roles.sort((a,b)=>{
          if(a % 2 === 1 && b % 2 !== 1){
            return 1;
          }
          else if(b % 2 === 1 && a % 2 !== 1){
            return -1;
          }
          else if(a < b){
            return -1;
          }
          else if(a > b){
            return 1;
          }
          return 0;
        }));
        set.forEach((role)=>{
          roles.push(
            <div className="lobbyRole">
            <strong> {countOccurrences(games.roles,role)  > 1
                      ? countOccurrences(games.roles,role)
                      : null} </strong>
            <img src={utils.resolveRole(role)} className="role" />
          </div>)
        })

        for(var i = 0 ; i < games.maxPlayers;i++){
          if(i >= games.currentPlayers){
          players.push(<span class="dot"></span>)
        }
        else{
          players.push(<span class="dot-highlighted"></span>)
        }
        }

        var game = <div className="game">
        <div className="joinGame" onClick={async()=>{
          var sendJSON = {
            gameId : games.gameId,
            playerid: this.props.playerid
          }
          const rawResponse = await fetch('https://www.beyondmafia.live/joinGame',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'bmcookie' : this.props.bmcookie
              },
              body: JSON.stringify(sendJSON)
            });
            const content = await rawResponse.json()
            if(content.cmd === 1){
              window.location.href = "/game/" + games.gameId;
            }
            if(content.cmd === -1 ){
              alert(content.msg);
            }
        }}>

        Join Game
        </div>
        <div className="players">
        {players}
        </div>
        {"GAME " + games.gameId + ' ' + games.maxPlayers.toString() + ' ' + games.currentPlayers.toString() + ' '}
        {roles}
        {games.maxPlayers !== games.currentPlayers
          ?
          <div className="gameStatus">
          Pregame
          <img className="lobbyHome" title="Pregame" src="/assets/home.png"/>
          </div>
          : null}
        </div>
        gamesArr.push(game);
      });

      var display = <div className="games">
      {gamesArr}
      </div>
	    return display;
	default:
	    var spinner = <div className="loading">
		<img src="/assets/knife.png"
		     className="spinner"
		     width="100px"
		     height="100px"
		     />
			  </div>
	    return spinner;
	}
	}

  var createGameDisplay = () =>{
   var roles = [];
   var currentRoles = [];
   var currentRolesSet = new Set(this.state.currentRoles.sort((a,b)=>{
     if(a % 2 === 1 && b % 2 !== 1){
       return 1;
     }
     else if(b % 2 === 1 && a % 2 !== 1){
       return -1;
     }
     else if(a < b){
       return -1;
     }
     else if(a > b){
       return 1;
     }
     return 0;
   }))
   const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
   currentRolesSet.forEach((role) => {
     currentRoles.push(
       <div>
       <strong> {countOccurrences(this.state.currentRoles,role) > 1
                 ? countOccurrences(this.state.currentRoles,role)
                 : null} </strong>
       <img onClick={()=>{
         var index = this.state.currentRoles.indexOf(role);
         var newArr =  this.state.currentRoles;
         for(var i = 0 ; i < newArr.length; i++){
           if(newArr[i]=== role){
             newArr[i] = this.state.currentRoles[0];
             newArr.shift();
             break;
           }
         }
         this.setState({currentRoles: newArr})
       }} src={utils.resolveRole(role)} className="currentRole"/>
     </div>);
   });

   utils.getAvailableRoles().sort((a,b)=>{
     if(a % 2 === 1 && b % 2 !== 1){
       return 1;
     }
     else if(b % 2 === 1 && a % 2 !== 1){
       return -1;
     }
     else if(a < b){
       return -1;
     }
     else if(a > b){
       return 1;
     }
     return 0;
   }).forEach((role) => {
     roles.push(<img className="currentRole" onClick={()=>{
       this.setState({ currentRoles: [...this.state.currentRoles, role] });
     }} src={utils.resolveRole(role)} />)
   });

    return (<div className="createHolder">
        {currentRoles.length !== 0
          ?
          <div>
          <div className="createGameOptions">
          <div className="createGameInner" onClick={async ()=>{
            await fetch('https://www.beyondmafia.live/createGame',{
      method: 'POST',
      keepalive:false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Connection':"close",
        'bmcookie': this.props.bmcookie
      },
      body: JSON.stringify({cmd:0,roles:this.state.currentRoles,settings:0})
    });
          }}>
          Create Game
          </div>
          <img onClick={()=>{
            this.setState({currentRoles:[]})
          } } className="trash" src="/assets/trash.png" width="100px" height="100px"/>
          </div>
          <div className="createTitle">
          Current Setup
          </div>
          <div className="currentRoleHolder">
          {currentRoles}
          </div>
          </div>
          : null}
        <div className="createTitle"> Available Roles
        </div>
      <div className="createGameRole">
    {roles}
    </div>
  </div>)
  }

  function displayGame(){
    return gameDisplay()
  }
  function displayCreateGame(){
    window.document.getElementsByClassName('allLobbies')[0].className = "allLobbies"
    window.document.getElementsByClassName('allLobbies')[0].style = ""
    window.document.getElementsByClassName('createGame')[0].style = "background-color: #d43434";
    return createGameDisplay();
  }

	return(
	    <div style={{display:"flex", marginLeft:"100px", marginTop:"22px", border: "hidden", borderRadius:"0px 15px 0px 0px", backgroundColor:'white', width:'50%',"min-width":"500px","font-family": `Montserrat`,"border-color":'black','border-style':'groove','border-width':'thin'}}>
		<div className="lobbyHeader">
		    <div className="lobbies">
			<div class="btn-group">
  				<button className='allLobbies active' onClick={()=>{
            window.document.getElementsByClassName('createGame')[0].style = ""
            window.document.getElementsByClassName('allLobbies')[0].style = "background-color: #d43434";
            this.setState({headerState:1})
          }}> All Lobbies </button>
  				<button className="mainLobby"> Main </button>
  				<button className="sandbox"> Sandbox </button>
				<button className="createGame" onClick={()=>{
          this.setState({headerState:4})
        }}> Create Game </button>
			</div>

		    </div>
		    {this.state.headerState === 1
          ? displayGame()
          : this.state.headerState === 4
            ? displayCreateGame()
            : null
          }
		</div>
	    </div>
	)
    }

}

export default Games;
