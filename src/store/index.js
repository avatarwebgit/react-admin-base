import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const logger = (store) => (next) => (action) => {
  // console.log("ACTION:", action.type, action.payload);
  return next(action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["ADD_SLIDER"], 
      },
    }).concat(logger, sagaMiddleware),//✅
});

sagaMiddleware.run(rootSaga);

export default store;
