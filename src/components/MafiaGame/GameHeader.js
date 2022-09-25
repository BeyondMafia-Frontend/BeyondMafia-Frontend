import React, {Component} from 'react';
import './css/GameHeader.css'
import * as utils from '../utils/image-resolver.js';
class GameHeader extends Component {
  constructor(props){
    super(props);
      this.state = {
    roleImages:[],
    roleSet:false,
    addedRoles: {},
	  playersUpdated: false,
	  gameStarted: false,
	  countDownTimer:false,
      }
  }

componentDidMount(){
}
  render(){
	let gameBanner;
  let rolesArray = [];
  if(!this.state.roleSet && this.props.roles && this.props.roles.length !== 0){
    var counter = {};
    this.props.roles.sort((a,b)=>{
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
    }).forEach((roleID, i) => {
    if(counter[roleID]){
      counter[roleID] = counter[roleID]+1;
    }
    else{
      counter[roleID] = 1;
    }
    if(this.props.roles.length-1 === i){
      this.setState({roleSet:true})
      this.setState({addedRoles:counter})
    }
});
}
if(this.state.roleSet){
  Object.keys(this.state.addedRoles).sort((a,b)=>{
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
  }).forEach((keys) => {
    var value =  parseInt(keys);
    rolesArray.push(<div>
      <strong>{this.state.addedRoles[keys]}</strong>
      <img src={utils.resolveRole(value)} width='35px' height='35px'/>
    </div>)
  });
}
	if(this.state.playersUpdated){
	    if(this.props.gameState !== 0){
		gameBanner = <div className="gameBanner">
				    <div className="headerText"> Game is starting...
				    </div>
			     </div>;
		this.setState({playersUpdated:false});
		setTimeout(()=>{
		    this.setState({countDownTimer:true})
		}, 2000);
	    }
	}
	return(
    <div>
    <div style={{"display":"flex"}}>
    {rolesArray}
    </div>
	    <div>
      <div className = "gameBanner">

           <div className="headerText">
           {this.props.selectedGameState === -1
             ?  <div className="prev" onClick={()=>{this.props.setSelectedGameState(this.props.gameState-1)}}>
              {
                (this.props.gameState > 1)
                ? <div className="prevText"> {(this.props.gameState % 2)
                          ? "Day"
                          : "Night"} {this.props.gameState-1}
                          </div>
                : this.props.gameState === 1
                 ? <div className="prevText"> Pregame </div>
                 : null
               }
           </div>
           : <div className="prev" onClick={()=>{this.props.setSelectedGameState(this.props.selectedGameState-1)}}>
            {
              (this.props.selectedGameState > 1)
              ? <div className="prevText"> {(this.props.selectedGameState % 2)
                        ? "Day"
                        : "Night"} {this.props.selectedGameState-1}
                        </div>
              : this.props.selectedGameState === 1
               ? <div className="prevText"> Pregame </div>
               : null
             }
         </div>
         }
         {(()=>{
           if(this.props.selectedGameState === -1){
             if(this.props.gameState === 0){
               return(
             <div className="midText">Pregame</div>
            )
             }
             if(this.props.selectedGameState % 2){
               return(
             <div className="midText">Day {this.props.gameState}</div>
            )
               }
               else{
                 return(
               <div className="midText">Night {this.props.gameState}</div>
              )
               }
           }
           else{
             if(this.props.selectedGameState === 0){
               return(
             <div className="midText">Pregame</div>
            )
             }
             if(this.props.selectedGameState % 2){
               return(
             <div className="midText">Night {this.props.selectedGameState}</div>
            )
               }
               else{
                 return(
               <div className="midText">Day {this.props.selectedGameState}</div>
              )
               }
           }
         })()
       }

       {this.props.selectedGameState === -1 || this.props.selectedGameState === this.props.gameState
         ? null
       : <div className="next" onClick={()=>{this.props.setSelectedGameState(this.props.selectedGameState+1)}}>
        {
          (this.props.selectedGameState < this.props.messageBankLength+1)
          ? <div className="nextText"> {(this.props.selectedGameState % 2)
                    ? "Day"
                    : "Night"} {this.props.selectedGameState+1}
                    </div>
          : this.props.selectedGameState === this.props.messageBankLength
           ? null
           : null
         }
     </div>
     }
           </div>
       </div>
       </div>
       </div>

  )}
}

export default GameHeader;
