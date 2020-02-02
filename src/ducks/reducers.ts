import authReducer from "./state/auth";
import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

export const reducers = combineReducers({
  auth: authReducer,
});

export type RootState = StateType<typeof reducers>;
