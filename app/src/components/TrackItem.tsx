import * as React from "react";
import { StatelessComponent } from "react";
import { Track } from "../interfaces/track";
const styles = require("../stylesheets/TrackItem.css");

interface PropTypes {
  track: Track;
};

const TrackItem: StatelessComponent<PropTypes> = ({ track }) => (
  <li className={styles.component}>{track.title}</li>
);

export default TrackItem;
