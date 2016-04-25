import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";
import {IfUser} from "../containers";

export const Header: StatelessComponent<{}> = () => (
  <IfUser>
    <nav className="flex bg-black">
      <ul className="list-reset">
          <li className="inline-block mr1">
            <Link to="/" className="btn red">cloudfm</Link>
          </li>
          <li className="inline-block mr1">
            <Link to="/collection" className="btn white">
              <i className="fa fa-music"></i> Collection
            </Link>
          </li>
          <li className="inline-block mr1">
            <Link to="/discover" className="btn white">
              <i className="fa fa-plus"></i> Discover
            </Link>
          </li>
          <li className="inline-block mr1">
            <Link to="/settings" className="btn white">
              <i className="fa fa-cog"></i> Settings
            </Link>
          </li>
      </ul>
    </nav>
  </IfUser>
);
