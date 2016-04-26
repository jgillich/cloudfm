import { routerReducer} from "react-router-redux";
import { combineReducers} from "redux";
import artistReducer from "./artist";
import trackReducer from "./track";
import playerReducer from "./player";
import userReducer from "./user";
import errorsReducer from "./errors";

const rootReducer = combineReducers({
  artists: artistReducer,
  errors: errorsReducer,
  player: playerReducer,
  routing: routerReducer,
  tracks: trackReducer,
  user: userReducer,
});

export default rootReducer;
