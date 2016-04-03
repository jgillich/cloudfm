import { Track } from "../interfaces/track"
import { StatelessComponent } from 'react'
import { li } from "react-hyperscript-helpers"

interface PropTypes {
  track: Track
}

const TrackItem: StatelessComponent<PropTypes> = ({ track }) => (
  li(track.title)
)

export default TrackItem
