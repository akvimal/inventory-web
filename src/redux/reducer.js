import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import dataCard from "./dataCard/reducer";
import table from "./table/reducer"

// const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const rootReducer = combineReducers({
  dataCard,
  table
});

export const store = createStoreWithMiddleware(rootReducer);
