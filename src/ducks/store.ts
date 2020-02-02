import { createStore } from "redux";
import { reducers } from "./reducers";

export default function configureStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    // applyMiddleware()
  );
}
