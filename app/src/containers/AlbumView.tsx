import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Track, Album} from "../interfaces";
import {playTrack} from "../actions";

interface AlbumListProps {
  dispatch: Dispatch;
  album: Album;
  tracks: Track[];
}


const Container: StatelessComponent<AlbumListProps> =
({album, tracks, dispatch}) => {

  return (
    <div className="flex flex-auto flex-column overflow-y-scroll px2 py2">
      <div className="h3">{album.name}</div>
      <ul className="list-reset">
        {tracks.map(track =>
          <li key={track._id}>
            <a className="btn" onClick={() => dispatch(playTrack(track))}>
              <i className="fa fa-play-circle pr1"/>
              {track.name}
            </a>
          </li>
        )}
      </ul>
  </div>
  );

};

export const AlbumView = connect(
  (state, ownProps) => {
    let album = state.albums.find(a => a._id === (ownProps as any).params.id);
    if(!album) {
      throw new Error("invalid album id");
    };

    return {
      album,
      tracks: state.tracks.filter(t => t.album === album._id),
    };
  },
  (dispatch) => ({dispatch})
)(Container);
