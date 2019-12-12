import React from "react";
import { Alert, Form, Button, Col } from "react-bootstrap";

export default class FinalSubmit extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    // this.props.finalSubmit(e);
    return this.props.history.push("/profile");
  };

  render() {
    return (
      <div className="form-bg">
        <h3>
          Thanks for filling<br></br>out the form!
        </h3>
        <p>
          You can now lean back and wait for Mails or manage your preferences in
          your profile!
        </p>
        <img className="final-img" src="/images/apartment-2.jpg" alt=""></img>
        <form onSubmit={this.handleSubmit}>
          <a href="/">
            <Button className="profile-btn" type="submit">
              Profile
            </Button>
          </a>
        </form>
      </div>
    );
  }
}
