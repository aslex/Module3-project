import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import checkMark from "../images/icon-checkmark.png";
import clock from "../images/icon-clock-edit.png";
import home from "../images/icon-home.png";


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
      <div className="home container-stretch">
        <div className="title">
          <h1>
            You've got <span className="notfat">[a]</span> flat!
          </h1>

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
        </div>
        <div className="row section-2">
          <div className="header col-12 mt-5">
            <h2>How it works:</h2>
          </div>
          <div className="info-box col-sm-4">
            <img src={checkMark} alt="checkmark" />
            <h3>Set your preferences</h3>
            <p>
              P-berg or X-berg? Pet-friendly or balcony a must-have? We got you
              covered.
            </p>
          </div>

          <div className="info-box col-sm-4">
            <img src={clock} alt="clock" />
            <h3>Wait for emails...</h3>
            <p>
              We automatically send a request to the apartments matching your
              search. We check again every hour for new listings so you never
              miss your dream home!
            </p>
          </div>

          <div className="info-box col-sm-4">
            <img src={home} alt="home" />
            <h3>View contacted flats</h3>
            <p>
              In your profile you can see all the flats that we have contacted
              on your behalf.
            </p>{" "}
          </div>
          <div className="col-12">
            {this.props.user ? (
              <Link to={`/profile`}>
                <button>My Profile</button>
              </Link>
            ) : (
              <Link to="/auth/signup">
                <button>Get started!</button>
              </Link>
            )}
          </div>
        </div>
        <div className="section-3 container-stretch">
          <div className="row">
            <div className="col-sm-12">
              <h2>Flat-hunting for the gatherer type</h2>

              <p>
                Searching for a new home is hard, time-consuming, and often
                disappointing. That's where we come in. Fill out our online form
                and we will automatically send contact requests to the relevant
                listings. Any new listing that comes online will be contacted
                within the hour.
              </p>

              <div className="m-4">
                <h4>See your flats</h4>
                <p>
                  Did you receive an email from a realtor? Check your profile to
                  see all the latest flats that have been contacted on your
                  behalf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
