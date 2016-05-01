import * as React from "react";
import {StatelessComponent, ReactElement} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {playTrack} from "../actions";
import {Artist, Album} from "../interfaces";

interface CollectionSidebarProps {
  artists: Artist[];
};

export const CollectionSidebar: StatelessComponent<CollectionSidebarProps> =
({artists}) => (
  <div className="mb0 overflow-y-scroll">
    {artists.map(a => (
      <div>
        <Link className="btn" key={a._id} to={`/collection/artist/${a._id}`}
          activeClassName="red">
          {a.name}
        </Link>
      </div>
    ))}
  </div>
);

interface CollectionProps {
  artists: Artist[];
  onTrackClick: () => void;
  children: ReactElement<void>;
  active: string;
};

function artistsWithAlbums(artists: Artist[], albums: Album[]): Artist[] {
  return artists.filter(a => !!albums.filter(al => al.artist === a._id).length);
}

export const Collection: StatelessComponent<CollectionProps> =
  ({children, artists, active}) => (
    <div className="flex flex-auto">
      <CollectionSidebar artists={artists}/>
      {children}
    </div>
  );

export const CollectionContainer = connect(
  (state) => ({
    artists: artistsWithAlbums(state.artists, state.albums),
  }),
  dispatch => ({
    onTrackClick: (track): void => dispatch(playTrack(track)),
  })
)(Collection);

