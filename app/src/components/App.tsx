import * as React from "react"
import { StatelessComponent } from "react"
import Header from "./Header"
import VisibleTrackList from "../containers/VisibleTrackList"
const styles = require("../stylesheets/App.css")

const App: StatelessComponent<any> = () => (
  <div className={styles.component}>
    <Header/>
    <div className={styles.main}>
      <VisibleTrackList/>
    </div>
  </div>
)

export default App
