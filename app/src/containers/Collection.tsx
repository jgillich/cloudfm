import * as React from "react";
import {connect} from "react-redux";
import {TrackList, ArtistList} from "../components";
import {playTrack} from "../actions";

const mapStateToProps = (state) => {
  return {
    artists: state.artists,
    tracks: state.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTrackClick: (track) => dispatch(playTrack(track)),
  };
};

const Container = ({artists, tracks, onTrackClick}) => {
  return (
    <div className="flex flex-wrap">
      <ArtistList artists={artists}/>
      <TrackList tracks={tracks} onTrackClick={onTrackClick}/>
    </div>
  );
};

export const Collection = connect(
  mapStateToProps,
  mapDispatchToProps /* tslint:disable:max-line-length */
)(Container as any); // FIXME https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237#issuecomment-203987302
