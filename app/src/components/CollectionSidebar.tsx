import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";
import {Artist} from "../interfaces";

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
