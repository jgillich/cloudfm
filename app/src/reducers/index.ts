import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import trackReducer from "./track";
import playerReducer from "./player";
import userReducer from "./user";

const rootReducer = combineReducers({
  form: formReducer,
  player: playerReducer,
  routing: routerReducer,
  tracks: trackReducer,
  user: userReducer,
});

export default rootReducer;
