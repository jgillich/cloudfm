import { routerReducer} from "react-router-redux";
import {modelReducer, formReducer} from "react-redux-form";
import { combineReducers} from "redux";
import albumsReducer from "./albums";
import artistsReducer from "./artists";
import tracksReducer from "./tracks";
import playerReducer from "./player";
import userReducer from "./user";
import errorsReducer from "./errors";

const rootReducer = combineReducers({
  addBackend: modelReducer("addBackend", {type: "jamendo"}),
  addBackendForm: formReducer("addBackend", {}),
  albums: albumsReducer,
  artists: artistsReducer,
  //errors: errorsReducer,
  player: playerReducer,
  routing: routerReducer,
  tracks: tracksReducer,
  user: userReducer,
});

export default rootReducer;
