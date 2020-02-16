import { createStore } from "redux";
import { reducers } from "./reducers";

export default function configureStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    process.env.NODE_ENV !== "production"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
    // applyMiddleware()
  );
}
