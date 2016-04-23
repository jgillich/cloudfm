import {Action, PlayerAction} from "../actions";

const playerReducer = (state = {}, action: PlayerAction) => {
  switch (action.type) {
    case Action.PlayTrack:
      return action.track;
    default:
      return state;
  };
};

export default playerReducer;
