import * as React from "react"
import { Track } from "../interfaces/track"
import { StatelessComponent } from 'react'

interface PropTypes {
  track: Track
}

const TrackItem: StatelessComponent<PropTypes> = ({ track }) => (
  <li>{track.title}</li>
)

export default TrackItem
