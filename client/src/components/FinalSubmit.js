import React from "react";

export default class FinalSubmit extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    return this.props.history.push("/profile");
  };

  render() {
    return (
      <div>
        <h2>Thanks for filling out the form!</h2>
        <p>
          You can now lean back and wait for Mails or manage your your
          preferences in your profile!
        </p>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Profile</button>
        </form>
      </div>
    );
  }
}
