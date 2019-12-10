import React, { Component } from "react";

export default class ContactForm extends Component {
  render() {
    return (
      <div>
        <h3>Contact Form</h3>
        <form>
          <label htmlFor="message">Your message</label>
          <textarea name="message" rows="4" cols="50"></textarea>

          <label></label>
        </form>
      </div>
    );
  }
}
