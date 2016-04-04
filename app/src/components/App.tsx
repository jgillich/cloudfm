import * as React from "react"
import { StatelessComponent } from "react"
import Header from "./Header"
import VisibleTrackList from "../containers/VisibleTrackList"
const styles = require("../stylesheets/App.css")

const App: StatelessComponent<any> = () => (
  <div className={styles.app}>
    <Header/>
    <VisibleTrackList/>
  </div>
)

export default App
