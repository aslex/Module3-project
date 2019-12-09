import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";

const Navbar = props => {
  const handleLogout = () => {
    // destroys the session on the server
    logout();
    // updates the `user` state in App
    props.clearUser(null);
  };

  return (
    <Nav className="nav justify-content-center" bg="dark">
      {props.user ? (
        <>
          <Link to="/profile">{props.user.username}'s Profile</Link>
          <Link to="/about">About</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </>
      ) : (
        <React.Fragment>
          <Link to="/about">About</Link>
          <Link to="/auth/signup">Signup</Link>
          <Link to="/auth/login">Login</Link>
        </React.Fragment>
      )}
    </Nav>
  );
};

export default Navbar;
