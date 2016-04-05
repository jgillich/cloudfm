import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import trackReducer from "./track";
import playerReducer from "./player";

const rootReducer = combineReducers({
  routing: routerReducer,
  player: playerReducer,
  tracks: trackReducer,
});

export default rootReducer;
