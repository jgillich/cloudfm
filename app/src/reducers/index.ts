import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"
import collectionReducer from "./collection"

const rootReducer = combineReducers({
  routing: routerReducer,
  collection: collectionReducer
})

export default rootReducer
