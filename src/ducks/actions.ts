import { ActionType } from "typesafe-actions";
import authActions from "./auth/actions";

const actions = {
  ...authActions
};

export type RootAction = ActionType<typeof actions>;
