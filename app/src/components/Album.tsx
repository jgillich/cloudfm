import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {Album, Artist, Track, RouterProps} from "../interfaces";
import {Link} from "react-router";
import {playTrack} from "../actions";
const logo = require("../assets/logo_white.svg");

interface AlbumListProps {
  albums: Album[];
}

export const AlbumList: StatelessComponent<AlbumListProps> = ({albums}) => {
  return (
    <div className="flex flex-auto overflow-y-scroll">
      <div>
      {albums.map(a => (
        <Link key={a._id} to={`/collection/album/${a._id}`}
          className="btn center">
          <img width="200" src={logo}/>
          <div>{a.name}</div>
          <div className="gray">{a.artist}</div>
        </Link>
      ))}
      </div>
    </div>
  );
};

export const AlbumListContainer = connect(
  (state, ownProps: RouterProps) => {
    let id = ownProps.params.id;
    let albums;

    if(id) {
      let artist = state.artists.find(a => a._id === id);

      if(!artist) {
        throw new Error("invalid artist id: " + id);
      }

      albums = state.albums.filter(a => a.artist === id);
    } else {
      albums = state.albums;
    }

    return {
      albums: albums.map(a => {
        let artist = state.artists.find(ar => ar._id === a.artist).name;
        return {
          _id: a._id,
          artist: artist,
          name: a.name,
        };
      }),
    };
  }
)(AlbumList);

interface AlbumItemProps {
  handleClick: (track: Track) => void;
  album: Album;
  artist: Artist;
  tracks: Track[];
}

export const AlbumItem: StatelessComponent<AlbumItemProps> =
({album, artist, tracks, handleClick}) => {
  return (
    <div className="flex flex-auto overflow-y-scroll mx2 my2">
      <div className="center mr4">
        <img width="200" src={logo}/>
        <div className="h3 bold">{album.name}</div>
        <div className="h3">{artist.name}</div>
      </div>
      <ul className="list-reset">
        {tracks.map(track =>
          <li key={track._id}>
            <a onClick={() => handleClick(track)} className="nowrap truncate">
              <span className="mx1">{track.number}</span> {track.name}
            </a>
          </li>
        )}
      </ul>
  </div>
  );
};

export const AlbumItemContainer = connect(
  (state, ownProps: RouterProps) => {
    let album = state.albums.find(a => a._id === ownProps.params.id);
    if(!album) {
      throw new Error("invalid album id");
    };

    let artist = state.artists
      .find(a => a._id === album.artist);

    let tracks = state.tracks
      .filter(t => t.album === album._id)
      .sort((a, b) => a.number - b.number);

    return {
      album,
      artist,
      tracks,
    };
  },
  (dispatch) => ({
    handleClick: (track: Track): void => dispatch(playTrack(track)),
  })
)(AlbumItem);
