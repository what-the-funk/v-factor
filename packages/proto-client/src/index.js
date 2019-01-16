import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { reducer as simplewebrtc } from "@andyet/simplewebrtc";
// import { Security, Auth } from "@okta/okta-react";

// import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import peersMiddleware from "./stream/data/middleware";
import stream from "./stream/data/reducer";
// import registration from "./registration/data/reducer";
// import login from "./login/data/reducer";
// import profile from "./profile/data/reducer";

const reducers = combineReducers({
  simplewebrtc,
  stream,
  // registration: registration,
  // login: login,
  // profile: profile,
});

const logger = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type && !action.type.includes("@andyet"),
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(logger, thunk, peersMiddleware)),
);
/* eslint-enable */

// const { REACT_APP_OKTA_ORG_URL, REACT_APP_OKTA_CLIENT_ID } = process.env;
const history = createBrowserHistory();

// const oktaConfig = new Auth({
//   history,
//   issuer: `${REACT_APP_OKTA_ORG_URL}/oauth2/default`,
//   redirect_uri: `${window.location.origin}/implicit/callback`,
//   client_id: REACT_APP_OKTA_CLIENT_ID,
//   onAuthRequired: ({ history }) => history.push("/login"),
// });

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Security auth={oktaConfig}>
//         <App />
//       </Security>
//     </Router>
//   </Provider>,
//   document.getElementById("root"),
// );

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
