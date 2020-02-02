import { createAction } from "typesafe-actions";
import { LOGIN, LOGOUT } from "./types";

export const login = createAction(LOGIN, (action) => { action() });
export const logout = createAction(LOGOUT);

export default {
  login,
  logout
};
