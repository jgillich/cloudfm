import {Album} from "../interfaces";
import {Action, AlbumAction} from "../actions";

function albumsReducer(state: Album[] = [], action: AlbumAction): Album[] {
  switch(action.type) {
    case Action.InsertAlbum:
      return [...state, action.album];
    case Action.RemoveAlbum:
      return state.filter(t => t._id !== action.album._id);
    case Action.UpdateAlbum:
      return state.map(t => t._id === action.album._id ? action.album : t);
    default:
      return state;
  };
};

export default albumsReducer;
