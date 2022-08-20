import React, {Component} from 'react';
import './css/GameHeader.css'
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
    this.importAll = this.importAll.bind(this);
  }

  importAll(r) {
      let images = {};
      r.keys().map(item => { images[item.replace('./', '')] = r(item); });
      return images;
  }

componentDidMount(){
  this.setState({roleImages:this.importAll(require.context('./assets/roles', true, /.*/))})
}
  render(){
	let gameBanner;
  let rolesArray = [];
  if(!this.state.roleSet && this.state.roleImages.length !== 0 && this.props.roles && this.props.roles.length !== 0){
    var counter = {};
    this.props.roles.forEach((roleID, i) => {
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
  Object.keys(this.state.addedRoles).forEach((keys) => {
    var value =  parseInt(keys);
    if(value === 0){
    rolesArray.push(<div>
      <strong>{this.state.addedRoles[keys]}</strong>
      <img className="headerRole" key={keys} src={this.state.roleImages['roleimg_EM-00-00-villager.png'].default}/>
    </div>)
  }
    if(value === 1){
    rolesArray.push(<div>
    <strong>{this.state.addedRoles[keys]}</strong>
    <img className="headerRole" key={keys} src={this.state.roleImages['roleimg_EM-01-00-vanilla.png'].default}/>
  </div>)
}
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

       {this.props.selectedGameState === -1
         ?  <div className="next" onClick={()=>{this.props.setSelectedGameState(this.props.gameState+1)}}>
          {
            (this.props.gameState < this.props.messageBankLength+1)
            ? <div className="nextText"> {(this.props.gameState % 2)
                      ? "Day"
                      : "Night"} {this.props.gameState+1}
                      </div>
            :  this.props.gameState === this.props.messageBankLength
             ? null
             : null
           }
       </div>
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
