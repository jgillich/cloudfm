import * as React from "react";
import {StatelessComponent} from "react";
import {connect} from "react-redux";
import {Album} from "../interfaces";
import {Link} from "react-router";
const logo = require("../assets/logo_white.svg");

interface AlbumListProps {
  albums: Album[];
}

const Container: StatelessComponent<AlbumListProps> = ({albums}) => {
  return (
    <div className="flex flex-wrap flex-auto overflow-y-scroll">
    {albums.map(a => (
      <div>
        <Link to={`/collection/album/${a._id}`} className="btn">
          <img  width="256" src={logo}/>
        </Link>
      </div>
    ))}
    </div>
  );
};

export const AlbumList = connect(
  (state, ownProps) => {
    let id = (ownProps as any).params.id;

    if(id) {
      let artist = state.artists.find(a => a._id === id);

      if(!artist) {
        throw new Error("invalid artist id");
      }

      return {
        albums: state.albums.filter(a => a.artist === id),
      };
    }

    return {
      albums: state.albums,
    };
  }
)(Container);
