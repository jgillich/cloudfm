import { StatelessComponent } from 'react'
import { li } from "react-hyperscript-helpers"

const Track: StatelessComponent<{ track: { title: string } }> = ({ track }) => (
  li(track.title)
)

export default Track
