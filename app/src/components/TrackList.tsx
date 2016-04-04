import * as React from "react";
import { StatelessComponent } from "react";
import { Track } from "../interfaces/track";
import TrackItem from "./TrackItem";
const styles = require("../stylesheets/TrackList.css");

interface PropTypes {
  tracks: Track[];
};

const TrackList: StatelessComponent<PropTypes> = ({ tracks }) => (
  <div className={styles.component}>
    <ul className={styles.trackList}>
      {tracks.map (track => <TrackItem track={track}/>)}
    </ul>
  </div>
);

export default TrackList;
