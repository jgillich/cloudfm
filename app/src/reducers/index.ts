import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import trackReducer from "./track";

const rootReducer = combineReducers({
  routing: routerReducer,
  tracks: trackReducer,
});

export default rootReducer;
