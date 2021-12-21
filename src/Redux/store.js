import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { truckReducer } from "./Reducers/truckReducer";
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  
});

const store = createStore(
  truckReducer,
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
