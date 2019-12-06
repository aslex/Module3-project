import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>You've got flat!</h1>

        <Link to="/auth/signup">
          <button>Get started!</button>
        </Link>

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
