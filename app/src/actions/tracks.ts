import { Track } from "../interfaces/track"

export const ADD_TRACK = "ADD_TRACK"

export function addTrack(track: Track) {
  return {type: ADD_TRACK, track}
}
