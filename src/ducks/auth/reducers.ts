import { combineReducers } from "redux";
import { LOGIN, LOGOUT } from "./types";
import { createReducer } from "typesafe-actions";

const auth = createReducer([], {
  [LOGIN]: (state, action) => state,
  [LOGOUT]: (state, action) => state
});

const authReducer = combineReducers({
  auth
});

export default authReducer;
