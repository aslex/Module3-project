import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { logout } from "../services/auth";

const Navigation = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.clearUser(null);
  };

  console.log(props.user);

  return (
    <>
      {props.user ? (
        <Navbar bg="info" expand="lg">
          <Navbar.Brand>
            <img
              src="./images/logo.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            ></img>
          </Navbar.Brand>
          <Navbar.Brand>You've got [a] flat!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/profile">{props.user.username}'s Profile</Link>
              <Link to="/about">About</Link>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar bg="info" expand="lg">
          <Navbar.Brand>
            <img
              src="./images/logo.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            ></img>
          </Navbar.Brand>
          <Navbar.Brand>You've got [a] flat!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/about">About</Link>
              <Link to="/auth/signup">Signup</Link>
              <Link to="/auth/login">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};

export default Navigation;
