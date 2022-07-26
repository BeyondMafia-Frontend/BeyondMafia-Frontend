import React, {Component} from 'react';
import logo from '../assets/logo-light.png';
import '../css/PlayerPage.css'

class PlayerPage extends Component {
  constructor(props){
    super(props);
      this.state = {
      }
  }

  render(){
  return(
    
    <div class='container'>
        <div class='header'>Header</div>
        <div class='banner'>Banner</div>
        <div class='banner'>Banner</div>
        <div class='msg-bar'>msg and settings</div>
        <div class='bar-left'>Shoutbox</div>
        <div class='bar-right'>Collections</div>
        <div class='bio-box'>bio</div>
        <div class='shout-chat'>shout chat..</div>
        <div class='collect-content'>collections content</div>
        <div class='bar-left'>friends</div>
        <div class='bar-right'>Favs</div>
        <div class='friends-content'>my friends</div>
        <div class='favs-content'> my Favs</div>
        <div class='stat-bar'> USER STATS</div>
        <div class='stat-content'> USER STATS</div>


    

    </div>
  );
  }
}

export default PlayerPage;
