import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { StateType } from "typesafe-actions";
import { firestoreReducer } from "redux-firestore";

export const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export type RootState = StateType<typeof reducers>;
