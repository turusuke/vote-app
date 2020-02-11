import React, { FC } from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty, useFirebase } from "react-redux-firebase";
import { RootState } from "./ducks/reducers";
import Main from "./components/Main";

const AuthIsLoaded: FC = ({ children }) => {
  const auth = useSelector(({ firebase }: RootState) => firebase.auth);
  return !isLoaded(auth) ? (
    <div>認証情報を読み込んでいます</div>
  ) : isEmpty(auth) ? (
    <div>未ログインです。{children}</div>
  ) : (
    <Main />
  );
};

export default function APP() {
  const firebase = useFirebase();
  return (
    <AuthIsLoaded>
      <button
        onClick={() =>
          firebase.login({
            provider: "google",
            type: "redirect"
          })
        }
      >
        ログイン
      </button>
    </AuthIsLoaded>
  );
}
