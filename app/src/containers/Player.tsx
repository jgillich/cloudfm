import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Track, Artist} from "../interfaces";
import {IfUser} from "../containers";
import {playTrack, pausePlayer} from "../actions";
import * as ReactHowler from "react-howler";

function trackUrl(track: Track): string {
  return `${process.env.SERVER_URL}/tracks/${track.uris[0]}.mp3`;
}

interface PlayerProps {
  track: Track;
  artist: Artist;
  playing: boolean;
  dispatch: Dispatch;
}

const PlayerComponent: StatelessComponent<PlayerProps> =
({track, artist, playing, dispatch}) => (
  <IfUser>
    <div className="flex justify-between items-center bg-blue white py1">
      <div>
        <a className="btn " onClick={() => dispatch(pausePlayer())}>
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
        <a className="btn" onClick={() => dispatch(pausePlayer())}>
          <i className="fa fa-fast-forward fa-lg px1"></i>
        </a>
      </div>
      <div className="col-5 center">
       <div>
        <div className="h3">{track ? `${track.name} - ${artist.name}` : null}</div>
        <progress value="0.375" className="progress">0.375</progress>
        {track ?
          <ReactHowler
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
  </IfUser>
);

export const Player = connect(
  (state) => {
    let track = state.player.track;
    let artist;

    if(track) {
      artist = state.artists.find(a => a._id === track.artist);
    }

    return {
      artist: artist,
      track: track,
      playing: state.player.playing,
    };
  },
  (dispatch) => ({dispatch})
)(PlayerComponent);
