import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import tracksReducer from "./tracks";

const rootReducer = combineReducers({
  routing: routerReducer,
  tracks: tracksReducer,
});

export default rootReducer;
