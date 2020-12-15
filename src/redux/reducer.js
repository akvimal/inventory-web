import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import dataCard from "./dataCard/reducer";

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const rootReducer = combineReducers({
  dataCard,
});

export const store = createStoreWithMiddleware(rootReducer);
