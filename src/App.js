import React from "react";
import Navbar from "./app/Navbar";
import "bulma/css/bulma.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/"></Route>
      </Switch>
    </div>
  );
}

export default App;
