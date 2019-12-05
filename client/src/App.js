import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import FormArea from "./components/FormArea";
import FormCity from "./components/FormCity";
import FormDate from "./components/FormDate";
import FormFeatures from "./components/FormFeatures";
import FormPrice from "./components/FormPrice";
import FormSize from "./components/FormSize";

class App extends React.Component {
  state = {
    city: "",
    size: 10,
    rooms: 1,
    bathrooms: 1,
    minPrice: 0,
    maxPrice: 0,
    balcony: false,
    accessible: false,
    park: false,
    pets: false,
    kitchen: false,
    startDate: null,
    neighborhoods: []
  };

  updateButtonState = event => {
    console.log(event.target.classList);
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
    // if ([...this.state.neighborhoods].includes(event.target.name)) {
    //   const index =this.state.neighborhoods.indexOf(event.target.name);
    //   this.setState({
    //     neighborhoods: this.setState.neighborhoods.splice(index, 1)
    //   });
    // }

    // this.setState(
    //   {
    //     [event.target.name]: !this.state[event.target.name]
    //   },
    //   () => {
    //     console.log(this.state);
    //   }
    // );
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
    axios.post("/api/submit", { search: this.state }).then(res => {
      console.log("front end response: ", res.data.response.listings);
    });
  };

  render() {
    return (
      <div className="App">
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
