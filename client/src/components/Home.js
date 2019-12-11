import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

export default class Home extends Component {
  handleLogout = props => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    this.props.clearUser(null);
  };

  render() {
    console.log(this.props.user);
    return (
      <div className='home'>
        <h1>You've got [a] flat!</h1>

        {this.props.user ? (
          <Link to={`/profile`}>
            <button>My Profile</button>
          </Link>
        ) : (
          <Link to="/auth/signup">
            <button>Get started!</button>
          </Link>
        )}

        {!this.props.user ? (
          <Link to="/auth/login">or Login</Link>
        ) : (
          <Link onClick={this.handleLogout} to="/">
            logout
          </Link>
        )}

        <div className='row m-4 section-2'>
        <div className="col-12 m-4">
          <h1>Here for the first time?</h1>
          <h3>How it works:</h3>
          </div>
          <div className='col-sm-4'>
          <img src='../../../images/icon-checkmark.png' alt='checkmark'/>
          <h3>Set your preferences</h3>
          <p>P-berg or X-berg? Pet-friendly or balcony a must-have? We got you covered.</p>
       
          </div>
          
          <div className='col-sm-4'>
          <img src="../../../images/icon-clock-edit.png" alt='clock'/>    
          <h3>Wait for emails...</h3>
          <p>We automatically send a request to the apartments matching your search. We check again every hour for new listings so you never miss your dream home!</p>
             
          </div>
          
          <div className='col-sm-4'>
          <img src='../../../images/icon-home.png' alt='home'/>
          <h3>View contacted flats</h3>
          <p>In your profile you can see all the flats that we have contacted on your behalf.</p>
        
          </div>
        </div>
      </div>
    );
  }
}
