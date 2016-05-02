import * as React from "react";
import {Component, ReactElement} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Howl} from "howler";
import {debounce} from "lodash";
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
  // The actual progress of the played track
  trackProgress?: number;
  // The displayed progress of the played track. This might differ from
  // trackProgress when the user manually moves the progress slider
  displayProgress?: number;
}

export class Player extends Component<PlayerProps, PlayerState> {

  // Is set to true when the user moves the progress slider
  private disableProgressUpdate: boolean;

  private howl: any; // FIXME Howl

  public constructor(props: PlayerProps) {
    super();
    this.state = {displayProgress: 0, trackProgress: 0};
    this.seek = debounce(this.seek, 500);
  }

  public initHowl({playing, track}: PlayerProps = this.props): void {
    if(this.howl) {
      this.howl.unload();
    }

    let timerId = setInterval(() => {
      this.setState({
        trackProgress: (this.howl.seek() / this.howl.duration()) * 100,
      });
    }, 500);

    this.howl = new (Howl as any)({
      autoplay: playing,
      onend: (): void => {
        clearInterval(timerId);
        if(this.props.track === track) {
          this.props.dispatch(forwardPlayer());
        }
      },
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

  public componentWillUnmount(): void {
    this.howl.unload();
  }

  public render(): ReactElement<void> {
    let {track, artist, playing, dispatch} = this.props;
    let {displayProgress, trackProgress} = this.state;

    if(!this.disableProgressUpdate && displayProgress !== trackProgress) {
      displayProgress = trackProgress;
    }

    return (
      <div className="flex justify-between items-center bg-blue white py1">
        <div>
          <a className="btn " onClick={() => {
            if(this.state.trackProgress > 10) {
              this.howl.seek(0);
            } else {
              dispatch(backwardPlayer());
            }
          }}>
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
          {track ?
            <div>
              <div className="h3 nowrap truncate"
                title={`${track.name} - ${artist.name}`}>
                <span>
                  <Link className="white" to={`/collection/album/${track.album}`}>
                    {track.name}
                  </Link>
                  <span className="px1">-</span>
                  <Link className="white" to={`/collection/artist/${track.artist}`}>
                    {artist.name}
                  </Link>
                </span>
              </div>
              <input value={displayProgress} type="range" onChange={(e) => {
                this.disableProgressUpdate = true;
                let value = parseInt((e.target as any).value, 10);
                this.setState({displayProgress: value});
                this.seek(value);
              }}/>
            </div>
            : null}
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

  private seek(percent: number): void {
    this.howl.seek(this.howl.duration() * (percent / 100));
    this.disableProgressUpdate = false;
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
