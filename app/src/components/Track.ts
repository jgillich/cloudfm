import { StatelessComponent } from 'react'
import { li } from "react-hyperscript-helpers"

const Track: StatelessComponent<any> = ({ track }) => (
  li(track.title)
)

export default Track
