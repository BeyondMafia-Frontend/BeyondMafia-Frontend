import React, {Component} from 'react';
import PlayerContainer from './PlayerContainer.js'

class GamePage extends Component {
  constructor(props){
      super(props);
	  this.state = {
      }
  }
render(){
  return(
<div>
<PlayerContainer />

</div>
);
}
}

export default GamePage;
