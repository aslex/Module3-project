import React from "react";
import { Alert, Form, Button } from "react-bootstrap";
import bckgrndimage from "../images/apartment-5.jpg";
import { Link } from "react-router-dom";

export default class About extends React.Component {
  render() {
    return (
      <div className="form-bg">
        <h2>About</h2>
        <div className="imgWrapper">
          <img className="about-img" src={bckgrndimage} alt=""></img>

          <p className="overlay">
            You've got [a] flat is an E-mail service tool for apartment seekers
            that facilitates the flat hunting process by automating an initial
            request to realtors based off of a user's stored preferences.
            <br></br>
            <br></br> It was built as a final project for the Web Development
            Bootcamp at Ironhack Berlin by Alexandra Servie and Laura Ningel.
            <br></br>
            <br></br>
            <a href="https://github.com/aslex/Module3-project">
              Find us on Github
            </a>
          </p>
        </div>
        {this.props.user ? (
          <Link to={`/profile`}>
            <button className="profile-btn custom-btn">My Profile</button>
          </Link>
        ) : (
          <Link to="/auth/signup">
            <button className="profile-btn custom-btn">Get started!</button>
          </Link>
        )}
      </div>
    );
  }
}
