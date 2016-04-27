import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";
import {Artist} from "../interfaces";

interface CollectionSidebarProps {
  artists: Artist[];
};

export const CollectionSidebar: StatelessComponent<CollectionSidebarProps> =
({artists}) => {
  return (
      <ul className="list-reset mb0 border-right overflow-y-scroll">
        {artists.map(a => {
          return (
            <Link to={`/collection/artist/${a._id}`}>
              <li className="px2 py1">
                {a.name}
              </li>
            </Link>
          );
        })
      }
      </ul>
  );
};
