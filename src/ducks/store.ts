import { combineReducers, createStore } from "redux";
import { reducers } from "./reducers";

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    // applyMiddleware()
  );
}
