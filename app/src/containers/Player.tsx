import * as React from "react";
import {StatelessComponent} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Track, PlayerState} from "../interfaces";
import {IfUser} from "../containers";
import {playTrack, pausePlayer} from "../actions";
import * as ReactHowler from "react-howler";

function trackUrl(track: Track): string {
  return `${process.env.SERVER_URL}/tracks/${track.uris[0]}.mp3`;
}

interface AddBackendProps {
  player: PlayerState;
  dispatch: Dispatch;
}

const Container: StatelessComponent<AddBackendProps> = ({player, dispatch}) => (
        <IfUser>
        <div className="flex justify-center bg-black white">
          <div>

          { player.playing ?
            <a className="btn" onClick={() => dispatch(pausePlayer())}>
              <i className="fa fa-pause"></i>
            </a>
            :
            <a className="btn"
              onClick={() => dispatch(playTrack(player.track))}>
              <i className="fa fa-play"></i>
            </a>
          }
          { player.track ?
            <span>{player.track.name}
              <div>
                <ReactHowler
                  src={trackUrl(player.track)}
                  playing={player.playing}
                />
              </div>
            </span>
          : null }
          </div>
        </div>
      </IfUser>
);

export const Player = connect(
  (state) => ({player: state.player}),
  (dispatch) => ({dispatch})
)(Container);
