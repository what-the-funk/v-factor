import React from 'react';
import { Route } from 'react-router-dom';
// import { SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Navigation from './navigation/components/Navigation';
import HomePage from './home/components/HomePage';
// import LoginPage from "./login/components/LoginPage";
// import RegistrationForm from "./registration/components/RegistrationForm";
// import ProfilePage from "./profile/components/ProfilePage";
import StreamerPage from './stream/components/StreamerPage';
import ViewerPage from './stream/components/ViewerPage';

// const { REACT_APP_OKTA_ORG_URL } = process.env;

const App = () => (
  <div>
    <Navigation />
    <main>
      <Route path="/" exact component={HomePage} />
      {/* <Route path="/implicit/callback" component={ImplicitCallback} />
      <Route path="/login" render={() => <LoginPage baseUrl={REACT_APP_OKTA_ORG_URL} />} />
      <Route path="/register" component={RegistrationForm} />
      <SecureRoute path="/profile" component={ProfilePage} /> */}
      <Route path="/stream/:room?" component={StreamerPage} />
      <Route path="/view" component={ViewerPage} />
    </main>
  </div>
);

export default App;
