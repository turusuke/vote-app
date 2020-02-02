import React from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import "./App.css";
import { RootState } from "./ducks/reducers";

export default function APP() {
  const firebase = useFirebase();
  const auth = useSelector(({ firebase }: RootState) => {
    // TODO: fix type error
    // @ts-ignore
    return firebase.auth;
  });

  function loginWithGoogle() {
    return firebase.login({ provider: "google", type: "popup" });
  }

  return <div className="App" />;
}
