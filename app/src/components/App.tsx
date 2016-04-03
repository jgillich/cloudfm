import * as React from "react"
import { StatelessComponent } from "react"
import VisibleTrackList from "../containers/VisibleTrackList"
const styles = require("../stylesheets/App.css")

const App: StatelessComponent<any> = () => (
  <div className={styles.app}>
    <h1>Hello, World!</h1>
    <VisibleTrackList/>
  </div>
)

export default App
