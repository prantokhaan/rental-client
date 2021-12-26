import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertReducer } from "./Reducers/alertReducer";
import { truckReducer } from "./Reducers/truckReducer";
import { bookingReducer } from "./Reducers/bookingReducer";
import {carReducer} from './Reducers/carReducer';
import {bikeReducer} from './Reducers/bikeReducer';
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  truckReducer,
  carReducer,
  bikeReducer,
  alertReducer,
  bookingReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
