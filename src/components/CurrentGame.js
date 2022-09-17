import React, {Component} from 'react';
import '../css/CurrentGame.css';
import * as utils from './utils/image-resolver.js';
class CurrentGame extends Component {
    constructor(props){
      super(props);
      this.state = {

      }
    }
    render(){
      var game;
      if(this.props.currentGame){
        var roles = [];
        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        const set = new Set(this.props.currentGame.roles);
        set.forEach((role)=>{
          roles.push(
            <div className="lobbyRole">
            <strong> {countOccurrences(this.props.currentGame.roles,role)  > 1
                      ? countOccurrences(this.props.currentGame.roles,role)
                      : null} </strong>
            <img src={utils.resolveRole(role)}/>
          </div>)
        })
          game = (<ul className="currentGame">
          <li>
          <p> Game #{this.props.currentGame.gameId}</p>
          <div className="currentRoles">
          {roles}
          </div>
          <div className="commands">
          <div className="option" onClick={async()=>{
            var sendJSON = {
              gameId : this.props.currentGame.gameId,
              playerid: this.props.playerid
            }
            const rawResponse = await fetch('https://www.beyondmafia.live/leaveGame',{
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
                window.location.href = "/lobby";
              }
          }}> Leave Game </div>
          <div className="option" onClick={()=>{ window.location.href = `game/${this.props.currentGame.gameId}`}}> Enter Game </div>
          </div>
      </li>
          </ul>)
        }
      return(
        <div>
        {game}
        </div>
      )
    }
  }
  export default CurrentGame;
