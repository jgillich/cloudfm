import { ul, h } from "react-hyperscript-helpers"
import Track from "./Track"

const TrackList = ({ collection }) => (
  ul(collection.map(track => h(Track, { track })))
)

export default TrackList
