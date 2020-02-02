import authReducer from "./state/auth";
import { combineReducers } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";

export const reducers = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer
});

export type RootState = ReturnType<typeof reducers>;
