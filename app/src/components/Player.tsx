import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Track, Artist} from "../interfaces";
import {
  playTrack, pausePlayer, forwardPlayer, backwardPlayer,
} from "../actions";
import {Howler} from "./";

function trackUrl(track: Track): string {
  return `${process.env.SERVER_URL}/tracks/${track.uris[0]}.mp3`;
}

interface PlayerProps {
  track: Track;
  artist: Artist;
  playing: boolean;
  dispatch: Dispatch;
}

export const Player: StatelessComponent<PlayerProps> =
({track, artist, playing, dispatch}) => (
  <div className="flex justify-between items-center bg-blue white py1">
    <div>
      <a className="btn " onClick={() => dispatch(backwardPlayer())}>
        <i className="fa fa-fast-backward fa-lg px1"></i>
      </a>
      { playing ?
        <a className="btn"
          onClick={() => dispatch(pausePlayer())}>
          <i className="fa fa-pause fa-2x px1"></i>
        </a>
        :
        <a className="btn"
          onClick={() => dispatch(playTrack(track))}>
          <i className="fa fa-play fa-2x px1"></i>
        </a>
      }
      <a className="btn" onClick={() => dispatch(forwardPlayer())}>
        <i className="fa fa-fast-forward fa-lg px1"></i>
      </a>
    </div>
    <div className="col-5 center">
      <div>
      <div className="h3 nowrap truncate"
        title={track ? `${track.name} - ${artist.name}` : null}>
        {track ?
          <span>
            <Link className="white" to={`/collection/album/${track.album}`}>
              {track.name}
            </Link>
            <span className="px1">-</span>
            <Link className="white" to={`/collection/artist/${track.artist}`}>
              {artist.name}
            </Link>
          </span>
          : null}
      </div>
      <progress value="0.375" className="progress">0.375</progress>
      {track ?
        <Howler
        src={trackUrl(track)}
        playing={playing}
      />
      : null}
    </div>
    </div>
    <div>
      <a className="btn px1" onClick={() => dispatch(pausePlayer())}>
        <i className="fa fa-repeat fa-lg"></i>
      </a>
      <a className="btn px1" onClick={() => dispatch(pausePlayer())}>
        <i className="fa fa-random fa-lg"></i>
      </a>
    </div>
  </div>
);

export const PlayerContainer = connect(
  (state) => {
    let track = state.player.track;
    let artist;

    if(track) {
      artist = state.artists.find(a => a._id === track.artist);
    }

    return {
      artist: artist,
      playing: state.player.playing,
      track: track,
    };
  },
  (dispatch) => ({dispatch})
)(Player);
