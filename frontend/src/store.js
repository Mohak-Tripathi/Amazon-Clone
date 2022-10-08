import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import { productsReducer, productDetailsReducer} from "./reducers/productReducers";
import { authReducer } from "./reducers/userReducers";

const rootreducer = combineReducers({
products : productsReducer,
productDetails : productDetailsReducer,
auth: authReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
