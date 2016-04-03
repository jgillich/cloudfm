import * as TracksActions from "../actions/tracks"

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
