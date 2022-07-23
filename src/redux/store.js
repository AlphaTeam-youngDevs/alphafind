import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import rootsaga from "./rootsaga";
const redux_saga = createSagaMiddleware();
const middlewares = [redux_saga];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middlewares),
});
redux_saga.run(rootsaga);
export default store;
