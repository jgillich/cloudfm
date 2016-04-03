import * as CollectionActions from "../actions/collection"
import * as _ from "lodash"

export default function collectionReducer(state = [], action: any) {
  switch (action.type) {
    case CollectionActions.ADD_TRACK:
      return [
        ...state,
        action.track
      ]
    default:
      return state
  }
}
