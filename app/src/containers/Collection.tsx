import * as React from "react";
import {StatelessComponent, ReactElement} from "react";
import {connect} from "react-redux";
import {CollectionSidebar} from "../components";
import {playTrack} from "../actions";
import {Artist, Track} from "../interfaces";

interface CollectionProps {
  artists: Artist[];
  tracks: Track[];
  onTrackClick: () => void;
  /* tslint:disable:no-any */
  children: ReactElement<any>;
  /* tslint:enable */
};

const Container: StatelessComponent<CollectionProps> =
  ({children, artists}) => (
    <div className="flex flex-auto">
      <CollectionSidebar artists={artists}/>
      {children}
    </div>
  );

export const Collection = connect(
  state => ({artists: state.artists, tracks: state.tracks}),
  dispatch => ({onTrackClick: (track): void => dispatch(playTrack(track))})
)(Container);

