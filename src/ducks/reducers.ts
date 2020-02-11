import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { StateType } from "typesafe-actions";
import { firestoreReducer } from "redux-firestore";

interface profileType {
  firebase: {
    profile: {
      avatarUrl: string;
      displayName: string;
      email: string;
      providerData: [{}];
    };
  };
}

export interface Themes {
  id: string;
  title: string;
  like: string[];
  comment: string;
  createdtime: string;
};

export interface firestoreType {
  firestore: {
    themes: Themes
  };
}

export const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export type RootState = StateType<typeof reducers> &
  profileType &
  firestoreType;
