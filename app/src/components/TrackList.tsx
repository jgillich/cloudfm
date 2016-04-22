import * as React from "react";
import {StatelessComponent} from "react";
import {Track} from "../interfaces/track";
import {TrackItem} from "./";

interface PropTypes {
  tracks: Track[];
  onTrackClick: any;
};

export const TrackList: StatelessComponent<PropTypes> = ({tracks, onTrackClick}) => (
  <div className="">
    <ul className="">
      {tracks.map (track =>
        <TrackItem
          key={track._id}
          track={track}
          onClick={() => onTrackClick(track)} />
      )}
    </ul>
  </div>
);
