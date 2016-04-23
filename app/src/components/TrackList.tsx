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

          <li className="px1 flex flex-wrap items-center" key={track._id}>
            <div className="col6">
              <a className="btn" onClick={() => onTrackClick(track)}><i className="fa fa-play-circle"></i></a>
            </div>
            <div>
              {track.name}
            </div>
          </li>
      )}
    </ul>
  </div>
);
