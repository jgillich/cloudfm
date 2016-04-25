import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {TrackList, ArtistList} from "../components";
import {playTrack} from "../actions";
import {Artist, Track} from "../interfaces";
import {Player} from "./";

interface CollectionProps {
  artists: Artist[];
  tracks: Track[];
  onTrackClick: () => void;
};

const Container: StatelessComponent<CollectionProps> =
  ({artists, tracks, onTrackClick}) => (
    <div className="flex flex-wrap">
      <ArtistList artists={artists}/>
      <TrackList tracks={tracks} onTrackClick={onTrackClick}/>
      <Player/>
    </div>
  );

export const Collection = connect(
  state => ({artists: state.artists, tracks: state.tracks}),
  dispatch => ({onTrackClick: (track): void => dispatch(playTrack(track))})
)(Container);

