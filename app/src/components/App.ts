import { StatelessComponent } from "react"
import { div, h1, h } from "react-hyperscript-helpers"
import VisibleTrackList from "../containers/VisibleTrackList"

const App: StatelessComponent<any> = () => (
  div([
    h1("Hello World!"),
    h(VisibleTrackList)
  ])
)

export default App
