import * as React from "react";
import { StatelessComponent } from "react";
import Header from "./Header";
import VisibleTrackList from "../containers/VisibleTrackList";
import Player from "../containers/Player";
const styles = require("../stylesheets/App.css");

const App: StatelessComponent<any> = () => (
  <div className={styles.component}>
    <Header/>
    <VisibleTrackList/>
    <Player/>
  </div>
);

export default App;
