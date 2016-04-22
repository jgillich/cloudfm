import * as React from "react";
import {StatelessComponent} from "react";
import {Track} from "../interfaces/track";

interface PropTypes {
  track: Track;
  onClick: any;
};

export const TrackItem: StatelessComponent<PropTypes> = ({track, onClick}) => (
  <li className="" onClick={onClick}>{track.name}</li>
);
