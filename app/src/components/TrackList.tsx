import * as React from "react";
import {StatelessComponent} from "react";
import {Track} from "../interfaces";

interface PropTypes {
  tracks: Track[];
  onTrackClick: any;
};

export const TrackList: StatelessComponent<PropTypes> = ({tracks, onTrackClick}) => (
  <div className="flex flex-auto">
    <ul className="list-reset flex-auto">
      {tracks.map (track =>
        <li className="border-bottom px1 py1" key={track._id} onClick={() => onTrackClick(track)}>
          {track.name}
        </li>
      )}
    </ul>
  </div>
);
