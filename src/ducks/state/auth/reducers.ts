import { LOGIN, LOGOUT } from "./types";
import { createReducer } from "typesafe-actions";

const auth = createReducer([0], {
  [LOGIN]: (state, action) => [...state],
  [LOGOUT]: (state, action) => state
});

export default auth;
