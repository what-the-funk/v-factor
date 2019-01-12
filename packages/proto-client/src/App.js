import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';

const { REACT_APP_OKTA_ORG_URL } = process.env;

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <main>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/login"
            render={() => <LoginPage baseUrl={REACT_APP_OKTA_ORG_URL} />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/register" component={RegistrationForm} />
          <SecureRoute path="/profile" component={ProfilePage} />
        </main>
      </div>
    );
  }
}

export default App;
