import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Security, Auth } from "@okta/okta-react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import registration from './registration/data/reducer';
import login from "./login/data/reducer";
import profile from "./profile/data/reducer";

const reducers = combineReducers({
  registration: registration,
  login: login,
  profile: profile
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(logger, thunk)));
/* eslint-enable */

const { REACT_APP_OKTA_ORG_URL, REACT_APP_OKTA_CLIENT_ID } = process.env;
const history = createBrowserHistory();

const oktaConfig = new Auth({
  history,
  issuer: `${REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: REACT_APP_OKTA_CLIENT_ID,
  onAuthRequired: ({ history }) => history.push("/login"),
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Security auth={oktaConfig}>
        <App />
      </Security>
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) module.hot.accept();
