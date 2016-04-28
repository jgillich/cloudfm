import * as React from "react";
import {StatelessComponent, ReactElement} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {playTrack} from "../actions";
import {Artist, Album} from "../interfaces";

interface CollectionSidebarProps {
  artists: Artist[];
  active: string;
};

export const CollectionSidebar: StatelessComponent<CollectionSidebarProps> =
({artists, active}) => (
  <ul className="list-reset mb0 overflow-y-scroll">
    {artists.map(a => (
      <Link key={a._id} to={`/collection/artist/${a._id}`}>
        <li className={"px2 py1 black" + (active === a._id ? " bg-aqua" : "")}>
          {a.name}
        </li>
      </Link>
    ))}
  </ul>
);

interface CollectionProps {
  artists: Artist[];
  onTrackClick: () => void;
  /* tslint:disable:no-any */
  children: ReactElement<any>;
  /* tslint:enable */
  active: string;
};

function artistsWithAlbums(artists: Artist[], albums: Album[]): Artist[] {
  return artists.filter(a => !!albums.filter(al => al.artist === a._id).length);
}

export const Collection: StatelessComponent<CollectionProps> =
  ({children, artists, active}) => (
    <div className="flex flex-auto">
      <CollectionSidebar artists={artists} active={active}/>
      {children}
    </div>
  );

export const CollectionContainer = connect(
  (state, ownProps) => ({
    active: (ownProps as any).params.id,
    artists: artistsWithAlbums(state.artists, state.albums),
  }),
  dispatch => ({onTrackClick: (track): void => dispatch(playTrack(track))})
)(Collection);

