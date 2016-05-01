import * as React from "react";
import {Component, ReactElement} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Howl} from "howler";
import {Track, Artist} from "../interfaces";
import {playTrack, pausePlayer, forwardPlayer, backwardPlayer,
} from "../actions";

interface PlayerProps {
  track: Track;
  artist: Artist;
  playing: boolean;
  dispatch: Dispatch;
}

interface PlayerState {
  seekTime: number;
}

export class Player extends Component<PlayerProps, PlayerState> {

  private howl: any; // FIXME Howl

  public initHowl({playing, track}: PlayerProps = this.props): void {
    if(this.howl) {
      this.howl.unload();
    }

    let timerId = setInterval(() => {
      this.setState({seekTime: this.howl.seek()});
    }, 500);

    this.howl = new (Howl as any)({
      autoplay: playing,
      onend: (): void => clearInterval(timerId),
      src: `${process.env.SERVER_URL}/tracks/${track.uris[0]}.mp3`,
    });
  }

  public componentWillUpdate(nextProps: PlayerProps, nextState: void): void {
    if(!this.props.track || nextProps.track._id !== this.props.track._id) {
      this.initHowl(nextProps);

    } else if(nextProps.playing && !this.props.playing) {
      this.howl.play();
    } else if(!nextProps.playing && this.props.playing) {
      this.howl.pause();
    }
  }

  public componentWillUnmount (): void {
    this.howl.unload();
  }

  public render(): ReactElement<void> {
    let {track, artist, playing, dispatch} = this.props;
    let progress = 0;

    if(this.howl) {
      progress = this.state.seekTime / this.howl.duration();
    }

    return (
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
        <progress value={progress} className="progress"></progress>
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
  }
}

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
