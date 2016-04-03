import { StatelessComponent } from 'react'
import { ul, h } from "react-hyperscript-helpers"
import { Track } from "../interfaces/track"
import TrackItem from "./TrackItem"

interface PropTypes {
  tracks: Track[]
}

const TrackList: StatelessComponent<PropTypes> = ({ tracks }) => (
  ul(tracks.map(track => h(TrackItem, { track })))
)

export default TrackList
