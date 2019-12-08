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
          <Link to={`/profile/${this.props.user._id}`}>
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

        <div>
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
