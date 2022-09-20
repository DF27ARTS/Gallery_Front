import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../reducer/reducer.js";

const store = createStore(
  combineReducers({ rootReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
