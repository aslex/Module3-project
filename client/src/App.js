import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  // getFlats {

  //   axios.GET('https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/region?realestatetype=ApartmentRent&geocodes=1276003001014').then(res => {
  //     console.log(res);
  //   })

  // }
  componentDidMount = () => {
    axios
      .get(
        "https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/region?realestatetype=ApartmentRent&geocodes=1276003001014&fulltext=Balkon%20Altbau",
        { headers: "Access-Control-Allow-Headers" }
      )
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    return (
      <div className="App">
        <Route path="/city" render={props => <FormCity {...props} />} />
      </div>
    );
  }
}

export default App;
