import * as React from "react";
import { StatelessComponent } from "react";
import { Header } from "./";
import { Player, VisibleTrackList } from "../containers";
const styles = require("../stylesheets/App.css");

export const App: StatelessComponent<any> = () => (
  <div className={styles.component}>
    <Header/>
    <VisibleTrackList/>
    <Player/>
  </div>
);
