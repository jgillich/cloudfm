import { routerReducer} from "react-router-redux";
import {modelReducer, formReducer} from "react-redux-form";
import { combineReducers} from "redux";
import artistReducer from "./artist";
import trackReducer from "./track";
import playerReducer from "./player";
import userReducer from "./user";
import errorsReducer from "./errors";

const rootReducer = combineReducers({
  addBackend: modelReducer("addBackend", {type: "jamendo"}),
  addBackendForm: formReducer("addBackend"),
  artists: artistReducer,
  errors: errorsReducer,
  player: playerReducer,
  routing: routerReducer,
  tracks: trackReducer,
  user: userReducer,
});

export default rootReducer;
