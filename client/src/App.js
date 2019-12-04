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
  // getFlats {

  //   axios.GET('https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/region?realestatetype=ApartmentRent&geocodes=1276003001014').then(res => {
  //     console.log(res);
  //   })

  // }

  // componentDidMount = () => {
  //   axios
  //     .get(
  //       "https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/region?realestatetype=ApartmentRent&geocodes=1276003001014&fulltext=Balkon%20Altbau",
  //       { headers: "Access-Control-Allow-Headers" }
  //     )
  //     .then(response => {
  //       console.log(response.data);
  //     });
  // };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/form1"
          render={props => <FormCity navigate={this.navigateNext} {...props} />}
        />
        <Route exact path="/form2" render={props => <FormSize {...props} />} />
        <Route exact path="/form3" render={props => <FormPrice {...props} />} />
        <Route
          exact
          path="/form4"
          render={props => <FormFeatures {...props} />}
        />
        <Route exact path="/form5" render={props => <FormArea {...props} />} />
        <Route exact path="/form6" render={props => <FormDate {...props} />} />
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
