import { ActionType } from "typesafe-actions";
import authActions from "./state/auth/actions";

const actions = {
  ...authActions
};

export type RootAction = ActionType<typeof actions>;
