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
      <div>
        <h1>You've got flat!</h1>

        {this.props.user ? (
<<<<<<< HEAD
          <Link to="/profile">
            <button>Visit Profile</button>
=======
          <Link to={`/profile`}>
            <button>My Profile</button>
>>>>>>> 2f740175764e0b3cd8a8ecf1ace291cd93e9e6cd
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

        <div>
          <h1>Here for the first time?</h1>
          <h3>How it works:</h3>
          <span>(1) Set your preferences</span>
          <br></br>
          <span>(2) Wait for emails...</span>
          <br></br>
          <span>(3) View automatically contacted flats in your viewings</span>
        </div>
      </div>
    );
  }
}
