import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {Album} from "../interfaces";
import {Link} from "react-router";
const logo = require("../assets/logo_white.svg");

interface AlbumListProps {
  albums: Album[];
}

const AlbumListComponent: StatelessComponent<AlbumListProps> = ({albums}) => {
  return (
    <div className="flex flex-auto overflow-y-scroll">
      <div>
      {albums.map(a => (
        <Link key={a._id} to={`/collection/album/${a._id}`} className="btn center">
          <img width="200" src={logo}/>
          <div>{a.name}</div>
          <div className="gray">{a.artist}</div>
        </Link>
      ))}
      </div>
    </div>
  );
};

export const AlbumList = connect(
  (state, ownProps) => {
    let id = (ownProps as any).params.id;
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
)(AlbumListComponent);
