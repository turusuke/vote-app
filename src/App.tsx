import React, { FC } from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty, useFirebase } from "react-redux-firebase";
import GoogleButton from "react-google-button";

import { RootState } from "./ducks/reducers";
import Main from "./components/Main";

const AuthIsLoaded: FC = ({ children }) => {
  const auth = useSelector(({ firebase }: RootState) => firebase.auth);
  return !isLoaded(auth) ? (
    <div>認証情報を読み込んでいます</div>
  ) : isEmpty(auth) ? (
    <Login/>
  ) : (
    <div>{children}</div>
  );
};

const Login = () => {
  const firebase = useFirebase();
  return (
    <GoogleButton
      onClick={() => {
        return firebase.login({
          provider: "google",
          type: "redirect"
        });
      }}
    />
  );
};

export default function APP() {
  return <AuthIsLoaded>
    <Main />
  </AuthIsLoaded>;
}
