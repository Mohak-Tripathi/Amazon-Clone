import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import { productsReducer } from "./reducers/productReducers";


const rootreducer = combineReducers({
products : productsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
