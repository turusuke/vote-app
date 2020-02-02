import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import configureStore from "./ducks/store";
import App from "./App";

const reduxStore = configureStore();

const fbConfig = {

};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users"
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: reduxStore.dispatch
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={reduxStore}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
