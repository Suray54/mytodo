import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";

export const isLocalEnvironment = () => {
  return process.env.REACT_APP_ENV === "local";
};

const middleWare = [thunk, logger];
const middleWares = applyMiddleware(...middleWare);

export const store = createStore(
  rootReducer,
  isLocalEnvironment()
    ? compose(middleWares, getDevToolConfig())
    : compose(middleWares)
);

function getDevToolConfig() {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__.call &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default store;

// import { createStore, applyMiddleware } from "redux";

// import rootReducer from "./root-reducer";

// const middlewares = [logger];

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// export default { store };
