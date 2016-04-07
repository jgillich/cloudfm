import * as React from "react";
import {StatelessComponent} from "react";
import {VisibleTrackList, Player} from "../containers";
const styles = require("../stylesheets/Collection.css");

export const Collection: StatelessComponent<any> = ({children}) => (
  <div className={styles.component}>
    <VisibleTrackList/>
    <Player/>
  </div>
);
