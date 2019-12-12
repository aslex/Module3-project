import React, { Component, Fragment } from "react";
import axios from "axios";
import { Alert, Form, Button, Col } from "react-bootstrap";

class Profile extends Component {
  state = {
    apartments: [],
    toggleUpdate: false,
    toggleContact: false,
    message: ""
    // preferences: {}
  };

  clearPreferences = event => {
    // event.preventDefault();
    axios
      .delete("/api/clear-preferences")
      .then(res => {
        console.log(res);
        this.setState({
          message: res.data.message
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick = event => {
    event.preventDefault();
    console.log(event.target);
    event.target.classList.toggle("active");
    this.props.updateButtonState(event);
  };

  toggleUpdate = () => {
    this.setState({ toggleUpdate: !this.state.toggleUpdate });
  };

  toggleContact = () => {
    this.setState({ toggleContact: !this.state.toggleContact });
  };

  componentDidMount() {
    axios.get(`/profile`).then(res => {
      console.log("component did mount", res.data);
      // const { city, size, rooms, bathrooms, features, neighborhoods } = res.data.preferences;

      this.setState({
        apartments: [...res.data.contactedFlats]
        // preferences: {
        // city,
        // size,
        // rooms,
        // bathrooms,
        // features,
        // neighborhoods
        // }
      });
    });
  }

  render() {
    if (!this.props.user) {
      return <div>You are not logged in!</div>;
    }
    const mappedApts = this.state.apartments.reverse().map(el => {
      return (
        <div className="flat col-sm-4" key={el._id}>
          <img className="" src={el.imageURL} alt="flat" />
          <div className="info ">
            <p>Price: {el.price}</p>
            <p>Size: {el.size}sqm</p>
            <p>Rooms: {el.rooms}</p>
            <a href={el.exposeURL} target="_blank">
              <p>view listing</p>
            </a>
          </div>
        </div>
      );
    });

    return (
      <div className="container profile-page">
        <h3>hi {this.props.user.username}</h3>

        <Button
          className="mb-1"
          variant="outline-info"
          onClick={this.toggleUpdate}
        >
          Update preferences
        </Button>
        <br></br>
        {this.state.toggleUpdate && (
          <Form onSubmit={this.props.updateUserPreferences}>
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={this.props.updateState}
                name="city"
                type="text"
                value={this.props.city}
                placeholder={this.props.city}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="size">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  name="size"
                  type="number"
                  onChange={this.props.updateState}
                  value={this.props.size}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="rooms">
                <Form.Label>Rooms</Form.Label>
                <Form.Control
                  name="rooms"
                  type="number"
                  onChange={this.props.updateState}
                  value={this.props.rooms}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="bathrooms">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control
                  name="bathrooms"
                  type="number"
                  onChange={this.props.updateState}
                  value={this.props.bathrooms}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="minPrice">
                <Form.Label>Min Price</Form.Label>
                <Form.Control
                  name="minPrice"
                  type="number"
                  onChange={this.props.updateState}
                  value={this.props.minPrice}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="maxPrice">
                <Form.Label>Max Price</Form.Label>
                <Form.Control
                  name="maxPrice"
                  type="number"
                  onChange={this.props.updateState}
                  value={this.props.maxPrice}
                />
              </Form.Group>
            </Form.Row>

            <p>Areas</p>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("friedrichshain")
                  ? "button active"
                  : "button"
              }
              name="friedrichshain"
            >
              Friedrichshain
            </button>

            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("kreuzberg")
                  ? "button active"
                  : "button"
              }
              name="kreuzberg"
            >
              Kreuzberg
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("prenzlauer berg")
                  ? "button active"
                  : "button"
              }
              name="prenzlauer berg"
            >
              Prenzlauer Berg
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("mitte")
                  ? "button active"
                  : "button"
              }
              name="mitte"
            >
              Mitte
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("shoeneberg")
                  ? "button active"
                  : "button"
              }
              name="shoeneberg"
            >
              Schöneberg
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("charlottenburg")
                  ? "button active"
                  : "button"
              }
              name="charlottenburg"
            >
              Charlottenburg
            </button>
            <br></br>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("neukoelln")
                  ? "button active"
                  : "button"
              }
              name="neukoelln"
            >
              Neukölln
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("wedding")
                  ? "button active"
                  : "button"
              }
              name="wedding"
            >
              Wedding
            </button>

            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("lichtenberg")
                  ? "button active"
                  : "button"
              }
              name="lichtenberg"
            >
              Lichtenberg
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("marzahn")
                  ? "button active"
                  : "button"
              }
              name="marzahn"
            >
              Marzahn
            </button>
            <button
              onClick={this.handleClick}
              className={
                this.props.neighborhoods.includes("reinickendorf")
                  ? "button active"
                  : "button"
              }
              name="reinickendorf"
            >
              Reinickendorf
            </button>

            <p>Features</p>
            <button
              className={
                this.props.features.includes("balcony")
                  ? "features button active"
                  : "features button"
              }
              name="balcony"
              onClick={this.handleClick}
            >
              Balcony
            </button>
            <button
              className={
                this.props.features.includes("parking")
                  ? "features button active"
                  : "features button"
              }
              name="parking"
              onClick={this.handleClick}
            >
              Parking Spot
            </button>
            <button
              className={
                this.props.features.includes("wheelchairfriendly")
                  ? "features button active"
                  : "features button"
              }
              name="wheelchairfriendly"
              onClick={this.handleClick}
            >
              Wheelchair accessible
            </button>
            <button
              className={
                this.props.features.includes("pets")
                  ? "features button active"
                  : "features button"
              }
              name="pets"
              onClick={this.handleClick}
            >
              Pets allowed
            </button>
            <button
              className={
                this.props.features.includes("fitted_kitchen")
                  ? "features button active"
                  : "features button"
              }
              name="fitted_kitchen"
              onClick={this.handleClick}
            >
              Fitted kitchen
            </button>
            <br></br>
            <button
              className={
                this.props.features.includes("fireplace")
                  ? "features button active"
                  : "features button"
              }
              name="fireplace"
              onClick={this.handleClick}
            >
              Fireplace
            </button>
            <button
              className={
                this.props.features.includes("furnished")
                  ? "features button active"
                  : "features button"
              }
              name="furnished"
              onClick={this.handleClick}
            >
              Furnished
            </button>
            <button
              className={
                this.props.features.includes("elevator")
                  ? "features button active"
                  : "features button"
              }
              name="elevator"
              onClick={this.handleClick}
            >
              Elevator
            </button>
            <br />
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            {this.props.message ? (
              <p className="message">{this.props.message}</p>
            ) : (
              <p></p>
            )}
          </Form>
        )}

        <Button
          className="mb-1"
          onClick={this.toggleContact}
          variant="outline-info"
        >
          Edit Contact Form
        </Button>
        {this.state.toggleContact && (
          <Form onSubmit={this.props.updateUserPreferences}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={this.props.updateState}
                  name="firstName"
                  type="text"
                  placeholder={this.props.firstName}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="phoneNumber"
                type="text"
                placeholder="Enter phone"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="emailAddress"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="message"
                as="textarea"
                rows="3"
                placeholder="Hello, I am interested in your apartment..."
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  name="street"
                  onChange={this.handleChange}
                  placeholder="1234 Main St"
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Number</Form.Label>
                <Form.Control name="houseNumber" placeholder="123" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="postcode"
                  placeholder="12345"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  placeholder="Berlin"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            {this.props.message ? (
              <p className="message">{this.props.message}</p>
            ) : (
              <p></p>
            )}
          </Form>
        )}
        <br></br>
        {this.props.user.preferences.city ?
        <Button onClick={this.clearPreferences} className="custom-btn">
          I've got [a] flat!
        </Button> : <div></div>}
        {this.state.message ? (
          <div className="message">{this.state.message}</div>
        ) : (
          <br />
        )}
        {this.props.user.preferences.city ?
        <h4 className="col-sm-7 mt-4">recently contacted flats: </h4> : <></>}
        <div className="all-the-flats row">{mappedApts}</div> 
      </div>
    );
  }
}

export default Profile;
