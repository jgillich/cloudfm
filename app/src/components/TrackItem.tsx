import * as React from "react";
import { StatelessComponent } from "react";
import { Track } from "../interfaces/track";
const styles = require("../stylesheets/TrackItem.css");

interface PropTypes {
  track: Track;
  onClick: any;
};

export const TrackItem: StatelessComponent<PropTypes> = ({ track, onClick }) => (
  <li className={styles.component} onClick={onClick}>{track.title}</li>
);
