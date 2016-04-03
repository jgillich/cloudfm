import * as React from "react"
import { StatelessComponent } from 'react'
import { Track } from "../interfaces/track"
import TrackItem from "./TrackItem"

interface PropTypes {
  tracks: Track[]
}

const TrackList: StatelessComponent<PropTypes> = ({ tracks }) => (
  <ul>{tracks.map (track => <TrackItem track={track}/>)}</ul>
)

export default TrackList
