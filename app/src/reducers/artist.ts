import {Artist} from "../interfaces";
import {INSERT_ARTIST, REMOVE_ARTIST, UPDATE_ARTIST, ArtistAction} from "../actions";


const artistReducer = (state: Artist[] = [], action: ArtistAction) => {
   switch (action.type) {
    case INSERT_ARTIST:
      return [ ...state, action.artist ];
    case REMOVE_ARTIST:
      return state.filter(t => t._id != action.artist._id);
    case UPDATE_ARTIST:
      return state.map(t => t._id == action.artist._id ? action.artist : t);
    default:
      return state;
  };
};

export default artistReducer;
