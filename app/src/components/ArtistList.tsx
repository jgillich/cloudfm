import * as React from "react";
import {StatelessComponent} from "react";
import {Artist} from "../interfaces";

interface PropTypes {
  artists: Artist[];
};

export const ArtistList: StatelessComponent<PropTypes> = ({artists}) => (
  <div className="flex">
    <ul className="list-reset">
      {artists.map (artist =>
        <li key={artist._id}><a className="btn">{artist.name}</a></li>
      )}
    </ul>
  </div>
);
