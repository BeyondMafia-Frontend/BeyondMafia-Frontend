import React, {Component} from 'react';
import "../css/Games.css"
import knife from '../assets/knife.png'
import * as utils from './utils/image-resolver.js';
class Games extends Component{
    constructor(props){
	super(props);
	this.state={
	    doneLoading: false,
	}
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
        const set = new Set(games.roles);
        set.forEach((role)=>{
          roles.push(
            <div className="role">
            <strong> {countOccurrences(games.roles,role)  > 1
                      ? countOccurrences(games.roles,role)
                      : null} </strong>
            <img src={utils.resolveRole(role)} width='35px' height='35px'/>
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
          const rawResponse = await fetch('http://127.0.0.1:3001/joinGame',{
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
        </div>
        gamesArr.push(game);
      });

      var display = <div classsName="games">
      {gamesArr}
      </div>
	    return display;
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
