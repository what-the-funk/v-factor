import React, { Component } from "react";
import { Route } from "react-router-dom";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";

import "./App.css";
import Navigation from "./navigation/components/Navigation";
import HomePage from "./home/components/HomePage";
import RegistrationForm from "./registration/components/RegistrationForm";
import LoginPage from "./login/components/LoginPage";
import ProfilePage from "./profile/components/ProfilePage";

const { REACT_APP_OKTA_ORG_URL } = process.env;

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <main>
          <Route path="/" exact component={HomePage} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/login" render={() => <LoginPage baseUrl={REACT_APP_OKTA_ORG_URL} />} />
          <Route path="/register" component={RegistrationForm} />
          <SecureRoute path="/profile" component={ProfilePage} />
        </main>
      </div>
    );
  }
}

export default App;
