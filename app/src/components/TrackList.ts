import { StatelessComponent } from 'react'
import { ul, h } from "react-hyperscript-helpers"
import Track from "./Track"

const TrackList: StatelessComponent<any> = ({ tracks }) => (
  ul(tracks.map(track => h(Track, { track })))
)

export default TrackList
