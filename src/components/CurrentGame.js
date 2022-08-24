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
            <div className="role">
            <strong> {countOccurrences(this.props.currentGame.roles,role)  > 1
                      ? countOccurrences(this.props.currentGame.roles,role)
                      : null} </strong>
            <img src={utils.resolveRole(role)} width='35px' height='35px'/>
          </div>)
        })
          game = (<ul className="currentGame">
          <li>
          <p> Game #{this.props.currentGame.gameId}</p>
          <div className="roleHolder">
          {roles}
          </div>
          <div className="commands">
          <div className="option"> Leave Game </div>
          <div className="option"> Enter Game </div>
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
