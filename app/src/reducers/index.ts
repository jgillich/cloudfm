import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  routing: routerReducer,
  tracks
})

function tracks(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}



export default rootReducer
