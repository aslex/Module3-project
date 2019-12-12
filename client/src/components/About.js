import React from "react";
import { Alert, Form, Button } from "react-bootstrap";

export default function About(props) {
  return (
    <div>
      <h2>About</h2>
      <div className="imgWrapper">
        <img className="about-img" src="./images/apartment-5.jpg" alt=""></img>

        <p className="overlay">
          You've got [a] flat is an E-mail service tool for apartment seekers
          that facilitates the flat hunting process by automating an initial
          request to realtors based off of a user's stored preferences.<br></br>
          <br></br> It was built as a final project for the Web Development
          Bootcamp at Ironhack Berlin by Alexandra Servie and Laura Ningel.
          <br></br>
          <br></br>Find us on Github
        </p>
      </div>
      <a href="/">
        <Button className="custom-btn" type="submit">
          Get started
        </Button>
      </a>
    </div>
  );
}
