import * as TracksActions from "../actions/tracks"
console.log("qqq");
export default function collectionReducer(state = [], action: any) {
  switch (action.type) {
    case TracksActions.ADD_TRACK:
      return [
        ...state,
        action.track
      ]
    default:
      return state
  }
}
