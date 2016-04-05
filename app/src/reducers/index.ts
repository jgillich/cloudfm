import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import trackReducer from "./track";
import playerReducer from "./player";

const rootReducer = combineReducers({
  player: playerReducer,

  routing: routerReducer,
  tracks: trackReducer,
});

export default rootReducer;
