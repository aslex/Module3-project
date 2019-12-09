import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import FormArea from "./components/FormArea";
import FormCity from "./components/FormCity";
import FormDate from "./components/FormDate";
import FormFeatures from "./components/FormFeatures";
import FormPrice from "./components/FormPrice";
import FormSize from "./components/FormSize";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FinalSubmit from "./components/FinalSubmit";

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
    startDate: null,
    neighborhoods: []
  };
  setUser = user => {
    this.setState({
      user: user
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

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <Home user={this.state.user} clearUser={this.setUser} />
          )}
        />

        {/* UPDATE profile route so its only available to the loggedin User: */}
        {/* <Route exact path="/" render={() => (
        //     loggedIn ? ( 
        //       <Redirect to="/form1"/>
        //     ) : (
        //       <Signup/>
        //     )
        //   )}
        // /> */}

        <Route
          path="/auth/signup"
          render={props => <Signup setUser={this.setUser} {...props} />}
        />

        <Route
          path="/auth/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />

        {/* <Route
          path="/profile"
          render={props => (
            <Profile user={this.state.user} {...props} setUser={this.setUser} />
          )}
        /> */}

        <Route
          exact
          path="/profile"
          render={props => (
            <Profile
              updateState={this.updateState}
              user={this.props.user}
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/form1"
          render={props => (
            <FormCity updateState={this.updateState} {...props} />
          )}
        />

        <Route
          exact
          path="/form2"
          render={props => (
            <FormSize updateState={this.updateState} {...props} />
          )}
        />
        <Route
          exact
          path="/form3"
          render={props => (
            <FormPrice updateState={this.updateState} {...props} />
          )}
        />
        <Route
          exact
          path="/form4"
          render={props => (
            <FormFeatures updateState={this.updateButtonState} {...props} />
          )}
        />
        <Route
          exact
          path="/form5"
          render={props => (
            <FormArea updateState={this.updateButtonState} {...props} />
          )}
        />
        <Route
          exact
          path="/form6"
          render={props => (
            <FormDate
              updateState={this.updateState}
              finalSubmit={this.finalSubmit}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/finalSubmit"
          render={props => <FinalSubmit setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
  // navigateNext = (current, props) => {

  //   console.log("navigateNext called");
  //   console.log(current, props.history);
  //   const next = toString(current++);
  //   return props.history.push(".form2");
  //   // return <Redirect to=`/form${next}` />;
  // };
}

export default App;
