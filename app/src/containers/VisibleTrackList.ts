import {connect} from "react-redux";
import {TrackList} from "../components";
import {playTrack} from "../actions";

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTrackClick: (track) => dispatch(playTrack(track)),
  };
};

export const VisibleTrackList = connect(
  mapStateToProps,
  mapDispatchToProps /* tslint:disable:max-line-length */
)(TrackList as any); // FIXME https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237#issuecomment-203987302
