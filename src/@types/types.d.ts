import { ActionType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('../ducks/actions').default>;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
