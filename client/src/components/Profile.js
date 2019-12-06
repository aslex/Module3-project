import React, { Component } from "react";
import axios from "axios";
import ContactedFlats from "./ContactedFlats";

export default class Profile extends Component {
  state = {
    // uncomment:
    // contactedFlats: this.props.user.contactedFlats

    // for testing:
    contactedFlats: [
      {
        size: 50,
        prize: "500",
        imageURL: "https://pictures.immobilienscout24.de/listings/cbfc5fd3-a4b6-4800-a818-3e80125dd9de-1323900672.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80",
        exposeURL: "https://www.immobilienscout24.de/expose/104314643"
      }
    ]
  };

  componentDidMount = () => {
    axios.get("/profile").then(response => {
      console.log(response.data);
      const { contactedFlats } = response.data; // Here we actually get the whole object, not just the object-ids
      this.setState({ contactedFlats });
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>My Profile</h1>
        <h3>Preferences</h3>

        {/* render the specific preferences of each user */}

        <button>Manage preferences</button>

        <h3>Recently contacted flats</h3>
        {this.state.contactedFlats.map(el => {
          return <ContactedFlats flatData={el} />;
        })}
      </div>
    );
  }
}
