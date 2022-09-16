
import React, {Component} from 'react';
import '../css/Footer.css';


class Footer extends Component {
    constructor(props){
      super(props);
      this.state = {

      }
    }

render(){

    return(

        <footer>

            <div className='footer-col'>
                <h3 className='center'>Quick Links</h3>
                    <div className='btn-square'>
                        <button class='footer'>Pinned Topics</button>
                        <button class='footer'>Pinned Topics</button>
                        <button class='footer'>Pinned Topics</button>
                        <button class='footer'>Pinned Topics</button>

                    </div>
            </div>
                              <div class='footer-dividerl'></div>


            <div className='footer-col'>
                <h3 className='center'>Recent Forums</h3>
                    <ul>
                        <li>Is classic setup any good?</li>
                        <li>Why I definitly deserve...</li>

                    </ul>

            </div>
                                <div class='footer-dividerl'></div>
            <div className='footer-col'>

                <h3 className='center'>Mod Mail</h3>
                    <p class="footer">
                        Contact the mod team for any issue you
                        <br></br>
                        may have. Please review the FAQ page first
                        <br></br>
                        before submitting a query to see if your
                        <br></br>
                        question is answered.
                    </p>

            </div>


        </footer>

    )
}
}
export default Footer;
