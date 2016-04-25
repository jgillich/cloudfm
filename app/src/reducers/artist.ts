import {Artist} from "../interfaces";
import {Action, ArtistAction} from "../actions";

function artistReducer(state: Artist[] = [], action: ArtistAction): Artist[] {
   switch (action.type) {
    case Action.InsertArtist:
      return [ ...state, action.artist ];
    case Action.RemoveArtist:
      return state.filter(t => t._id != action.artist._id);
    case Action.UpdateArtist:
      return state.map(t => t._id == action.artist._id ? action.artist : t);
    default:
      return state;
  };
};

export default artistReducer;
