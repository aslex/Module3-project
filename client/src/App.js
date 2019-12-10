import React from "react";
import { Route, Link, Switch, MemoryRouter } from "react-router-dom";
import "./App.css";
import axios from "axios";
import FormArea from "./components/FormArea";
import FormCity from "./components/FormCity";
import FormFeatures from "./components/FormFeatures";
import FormPrice from "./components/FormPrice";
import FormSize from "./components/FormSize";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FinalSubmit from "./components/FinalSubmit";
import Navigation from "./components/Navigation";
import ContactForm from "./components/ContactForm";

class App extends React.Component {
  state = {
    user: this.props.user,
    city: "",
    size: 10,
    rooms: 1,
    bathrooms: 1,
    minPrice: 0,
    maxPrice: 0,
    features: [],
    neighborhoods: [],
    contactForm: {
      firstname: "",
      lastname: "",
      phoneNumber: 0,
      emailAddress: "",
      appointmentRequested: "",
      message: "",
      address: {
        "@xsi.type": "",
        street: "",
        houseNumber: "",
        postcode: "",
        city: ""
      }
    }
  };

  setUser = user => {
    if (!user) {
      this.setState({
        user: null,
        city: "",
        size: 10,
        rooms: 1,
        bathrooms: 1,
        minPrice: 0,
        maxPrice: 0,
        features: [],
        neighborhoods: []
      });
      return;
    }
    const {
      city,
      size,
      rooms,
      bathrooms,
      minPrice,
      maxPrice,
      features,
      neighborhoods
    } = user.preferences;
    // const {
    //   firstname,
    //   lastname,
    //   phoneNumber,
    //   appointmentRequested = "YES",
    //   emailAddress
    // } = user.contactForm;
    // const { street, houseNumber, postcode } = user.contactForm.address;
    this.setState({
      // ...this.state,
      user,
      city,
      size,
      rooms,
      bathrooms,
      minPrice,
      maxPrice,
      features,
      neighborhoods,
      contactForm: {
        ...user.contactForm
      }
    });
  };

  updateButtonState = event => {
    console.log(event.target.classList);

    if ([...event.target.classList].includes("features")) {
      if ([...event.target.classList].includes("active")) {
        this.setState(
          {
            features: this.state.features.concat(event.target.name)
          },
          () => {
            console.log(this.state);
          }
        );
      } else {
        this.setState(
          {
            features: this.state.features.filter(el => el !== event.target.name)
          },
          () => console.log(this.state)
        );
      }
    } else {
      if ([...event.target.classList].includes("active")) {
        this.setState(
          {
            neighborhoods: this.state.neighborhoods.concat(event.target.name)
          },
          () => {
            console.log(this.state);
          }
        );
      } else {
        this.setState(
          {
            neighborhoods: this.state.neighborhoods.filter(
              el => el !== event.target.name
            )
          },
          () => {
            console.log(this.state);
          }
        );
      }
    }
  };
  updateState = event => {
    console.log("update state called");
    console.log(event.target);
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => console.log(this.state)
    );
  };
  updateUserPreferences = e => {
    e.preventDefault();
    console.log("PASSED TO AXIOS", this.state);
    axios
      .put("/profile/update-preferences", { settings: this.state })
      .then(res => {
        console.log("front end response from updating preferences", res.data);
      });
  };
  finalSubmit = () => {
    console.log("final Submit!");
    axios
      .post("/api/submit", { search: this.state })
      .then(res => {
        console.log("front end response: ", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    if (this.props.user) {
      this.setUser(this.props.user);
    }
  }

  render() {
    return (
      // <MemoryRouter>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/form1"
            render={props => (
              <FormCity
                updateState={this.updateState}
                user={this.state.user}
                info={this.state}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/form2"
            render={props => (
              <FormSize
                updateState={this.updateState}
                user={this.state.user}
                info={this.state}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/form3"
            render={props => (
              <FormPrice
                updateState={this.updateState}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/form4"
            render={props => (
              <FormFeatures
                updateState={this.updateButtonState}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/form5"
            render={props => (
              <FormArea
                updateState={this.updateButtonState}
                setUser={this.setUser}
                user={this.state.user}
                {...props}
              />
            )}
          />

          <Route
            exact
            path="/form6"
            render={props => (
              <ContactForm
                setUser={this.setUser}
                finalSubmit={this.finalSubmit}
                user={this.state.user}
                {...props}
              />
            )}
          />

          <>
            <Navigation user={this.state.user} clearUser={this.setUser} />

            <Route
              exact
              path="/"
              render={() => (
                <Home user={this.state.user} clearUser={this.setUser} />
              )}
            />
            <Route
              path="/auth/signup"
              render={props => <Signup setUser={this.setUser} {...props} />}
            />
            <Route
              path="/auth/login"
              render={props => <Login setUser={this.setUser} {...props} />}
            />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  finalSubmit={this.finalSubmit}
                  updateState={this.updateState}
                  user={this.props.user}
                  updateButtonState={this.updateButtonState}
                  updateUserPreferences={this.updateUserPreferences}
                  {...props}
                  {...this.state}
                />
              )}
            />
            <Route
              exact
              path="/finalSubmit"
              render={props => (
                <FinalSubmit setUser={this.setUser} {...props} />
              )}
            />
          </>
        </Switch>
      </div>
      // </MemoryRouter> */}
    );
  }
}

export default App;
