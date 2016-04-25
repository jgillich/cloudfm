import * as React from "react";
import {StatelessComponent} from "react";
import {Track} from "../interfaces";

interface PropTypes {
  tracks: Track[];
  onTrackClick: (track: Track) => void;
};

export const TrackList: StatelessComponent<PropTypes> = ({tracks, onTrackClick}) => (
  <div className="flex flex-auto">
    <ul className="list-reset flex-auto">
      {tracks.length ? tracks.map (track =>
          <li className="px1 flex flex-wrap items-center" key={track._id}>
            <div className="col6">
              <a className="btn" onClick={() => onTrackClick(track)}>
                <i className="fa fa-play-circle"/>
              </a>
            </div>
            <div>
              {track.name}
            </div>
          </li>
      ) : <div>No tracks found</div>}
    </ul>
  </div>
);
